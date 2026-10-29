import subprocess
import numpy as np
from PIL import Image, ImageFilter
import time
import os

def convert_video_to_alpha_webm(input_path, output_path, max_frames=None):
    print(f"Starting conversion: {input_path} -> {output_path}")
    start_time = time.time()
    
    # Get video info
    cmd_probe = ['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate,nb_frames', '-of', 'csv=p=0', input_path]
    probe_out = subprocess.check_output(cmd_probe).decode().strip().split('\n')[0].split(',')
    w = int(probe_out[0])
    h = int(probe_out[1])
    fps_parts = probe_out[2].split('/')
    fps = float(fps_parts[0]) / float(fps_parts[1]) if len(fps_parts) > 1 else float(fps_parts[0])
    
    print(f"Video resolution: {w}x{h}, FPS: {fps}")
    
    cmd_in = ['ffmpeg', '-i', input_path]
    if max_frames:
        cmd_in.extend(['-vframes', str(max_frames)])
    cmd_in.extend(['-f', 'image2pipe', '-pix_fmt', 'rgb24', '-vcodec', 'rawvideo', '-'])
    
    cmd_out = [
        'ffmpeg', '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{w}x{h}',
        '-pix_fmt', 'rgba',
        '-r', str(fps),
        '-i', '-',
        '-c:v', 'libvpx-vp9',
        '-pix_fmt', 'yuva420p',
        '-b:v', '2500k',
        '-auto-alt-ref', '0',
        output_path
    ]
    
    p_in = subprocess.Popen(cmd_in, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    p_out = subprocess.Popen(cmd_out, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)
    
    frame_bytes = w * h * 3
    bg = np.array([93.0, 83.0, 84.0], dtype=np.float32)
    
    count = 0
    while True:
        raw = p_in.stdout.read(frame_bytes)
        if not raw or len(raw) < frame_bytes:
            break
            
        arr = np.frombuffer(raw, dtype=np.uint8).reshape((h, w, 3)).astype(np.float32)
        
        # Color distance from uniform studio background
        dist = np.sqrt(np.sum((arr - bg) ** 2, axis=-1))
        
        # Erase generator watermark in bottom-right corner
        dist[int(h * 0.85):, int(w * 0.75):] = 0.0
        
        # Smooth polynomial transition (smoothstep)
        t = np.clip((dist - 14.0) / 16.0, 0.0, 1.0)
        alpha = (t * t * (3.0 - 2.0 * t) * 255.0).astype(np.uint8)
        
        # Color defringing / spill suppression on anti-aliased edge pixels
        mask_edge = (t > 0.05) & (t < 0.95)
        for c in range(3):
            arr[mask_edge, c] = np.clip(
                (arr[mask_edge, c] - (1.0 - t[mask_edge]) * bg[c]) / np.maximum(t[mask_edge], 0.1),
                0, 255
            )
            
        # Subtle 1px box blur for sub-pixel anti-aliasing
        alpha_im = Image.fromarray(alpha, mode='L').filter(ImageFilter.BoxBlur(1))
        alpha_arr = np.array(alpha_im)
        
        rgba = np.dstack((arr.astype(np.uint8), alpha_arr))
        p_out.stdin.write(rgba.tobytes())
        count += 1
        if count % 24 == 0:
            print(f"Processed {count} frames ({count/fps:.1f}s)...")
            
    p_in.stdout.close()
    p_out.stdin.close()
    p_in.wait()
    p_out.wait()
    
    elapsed = time.time() - start_time
    print(f"Finished {count} frames in {elapsed:.1f}s! Output saved to: {output_path}")

if __name__ == '__main__':
    convert_video_to_alpha_webm('public/ronaldo-idle.mp4', 'public/ronaldo-idle.webm')
    convert_video_to_alpha_webm('public/ronaldo-siuu.mp4', 'public/ronaldo-siuu.webm')
