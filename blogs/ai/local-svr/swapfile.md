---
title: Add swap file
---


Since you are running CachyOS, you have access to a high-performance Arch-based environment that handles memory management incredibly well. Since CachyOS defaults to using **ZRAM** (compressed RAM swap) out of the box, your system RAM might look full on paper, but adding a traditional disk-based swap partition (or swap file) on your fast NVMe SSD is the perfect way to provide that extra safety net for heavy local LLM and video workflows.

Here is how to check your current setup and add a swap partition or file.

### Step 1: Check Your Current Swap Status

Open your terminal and run either of the following commands to see what CachyOS is currently utilizing:

Bash

```
swapon --show
```

_Or for a quick memory overview:_

Bash

```
free -h
```

> 💡 **What you'll likely see:** CachyOS typically pre-configures a ZRAM device (e.g., `/dev/zram0`) equal to your total RAM capacity. While great for general performance, ZRAM still lives in your physical 32GB memory pool. When heavy weights overflow both VRAM and RAM, ZRAM can exhaust your remaining overhead, which triggers those abrupt OOM crashes.

### Step 2: Decide Between a Swap Partition vs. Swap File

-   **Swap Partition:** Requires unallocated space on your drive to format a dedicated partition.
    
-   **Swap File:** **Highly recommended for CachyOS.** It can be created instantly on your existing filesystem without shrinking or re-partitioning your drive, and it performs identically to a partition on modern NVMe drives.
    

_Note: If your CachyOS installation uses the default **Btrfs** file system, creating a swap file requires a couple of specific subvolume commands. Let's look at how to set up a robust **24GB Swap File** on both Btrfs and EXT4._

### Step 3: Adding a 24GB Swap File

#### Option A: If your filesystem is Btrfs (CachyOS Default)

Btrfs requires you to create a non-copy-on-write (NoCOW) file so the system can read/write to it directly without performance degradation.

Bash

```
# 1. Create an empty file
sudo truncate -s 0 /swapfile

# 2. Disable Copy-on-Write (CoW) on the file (Required for Btrfs)
sudo chattr +C /swapfile

# 3. Allocate the 24GB size
sudo fallocate -l 24G /swapfile

# 4. Set the strict secure permissions
sudo chmod 600 /swapfile

# 5. Format it as swap space
sudo mkswap /swapfile

# 6. Activate it immediately
sudo swapon /swapfile
```

#### Option B: If your filesystem is EXT4 / XFS

If you chose a traditional filesystem during the CachyOS installation, the process is slightly shorter:

Bash

```
# 1. Allocate a 24GB file directly
sudo fallocate -l 24G /swapfile

# 2. Set secure permissions
sudo chmod 600 /swapfile

# 3. Format it as swap space
sudo mkswap /swapfile

# 4. Activate it immediately
sudo swapon /swapfile
```

### Step 4: Make the Swap Permanent

Right now, the swap file is active but will disappear when you reboot. To make it load automatically on every boot, you need to append it to your file system table (`/etc/fstab`).

Run this single command to append the correct configuration line:

Bash

```
echo '/swapfile none swap defaults 0 0' | sudo tee -a /etc/fstab
```

### Step 5: Verify It Works

Run the check command again to ensure both your ZRAM and your new disk-backed swap file are active together:

Bash

```
swapon --show
```

You should see your `/swapfile` listed right alongside your ZRAM device. Now, when your local text encoder and LTX loops max out your physical memory bounds, the OS will gracefully spill the inactive data over to your SSD instead of instantly killing your ComfyUI generation process.

You said

I followed the steps and succeeded to increase swap file. Now I changed my idea, I want to revert it and create a new one of size 64gb. How should I do it?

## Gemini said

To resize your swap space to 64GB, you need to safely turn off the existing 24GB swap file before modifying or overwriting it. Since you already added the auto-mount entry to your `/etc/fstab` file, you can keep that line intact and simply swap the file out underneath it.

Here is the step-by-step process to cleanly revert the old file and initialize a new 64GB swap space.

### Step 1: Deactivate the Current Swap File

Before you can modify or delete the file, you must tell the Linux kernel to stop using it. Run the following command:

Bash

```
sudo swapoff /swapfile
```

_(This might take a few moments to complete as the system shifts any active data back into your physical RAM or ZRAM)._

### Step 2: Create the New 64GB Swap File

Choose the option below that matches the filesystem you used during your CachyOS installation.

#### Option A: If your filesystem is Btrfs (CachyOS Default)

We will securely remove the old file, handle the NoCOW attribute setup required by Btrfs, and allocate the new 64GB footprint.

Bash

```
# 1. Remove the old 24GB file
sudo rm /swapfile

# 2. Create a clean, empty placeholder file
sudo truncate -s 0 /swapfile

# 3. Disable Copy-on-Write (CoW) for the file
sudo chattr +C /swapfile

# 4. Allocate the full 64GB size
sudo fallocate -l 64G /swapfile
```

#### Option B: If your filesystem is EXT4 or XFS

If you opted for a traditional filesystem layout, you can directly overwrite the existing file size in one step:

Bash

```
sudo fallocate -l 64G /swapfile
```

### Step 3: Format and Re-enable the Swap Space

Now that the file size is expanded, secure its permissions, register it as valid swap space, and boot it back up:

Bash

```
# 1. Ensure strict root-only read/write permissions
sudo chmod 600 /swapfile

# 2. Format the expanded space
sudo mkswap /swapfile

# 3. Re-engage the swap file
sudo swapon /swapfile
```

### Step 4: Verify the Expansion

Since you already added the entry to your `/etc/fstab` file in your previous setup, you do not need to edit that file again. It will automatically mount this new 64GB file on your next boot.

Verify that your system recognizes the full size upgrade by running:

Bash

```
swapon --show
```

You should see `/swapfile` listed with a size of `64G`. With a buffer this large sitting on your NVMe drive, you can comfortably run long 5-second LTX-2.3 clips at 480p without fearing memory-induced application crashes.
