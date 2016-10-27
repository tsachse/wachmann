#!/bin/bash

set -x

photo_dir=/tmp/$$
img=img-$(date +%F-%H-%M-%S).gif

mkdir -p $photo_dir

# Test ...
cp ~/Code/wachmann/images/test/* $photo_dir
sleep 5

# Praxis
echo raspistill -w 640 -h 480 -tl 250 -t 5000 -o $photo_dir/img_%04d.jpg

convert -delay 25 -loop 0 $photo_dir/img_*.jpg img.gif
# convert -delay 25 -loop 0 $photo_dir/img_*.jpg $img
# cp $img img.gif

rm -Rf $photo_dir
