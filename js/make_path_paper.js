        var fabmo = new FabMoDashboard();
        var path;
        var last_pos_x = 0;
        var last_pos_y = 0;
        var pos;
        var err;
        var pt_ct = 0, seg_ct = 0, next_ct = 0;



        var textItem = new PointText({
            content: 'Click and drag to draw a line.',
            point: new Point(20, 30),
            fillColor: 'black',
        });


        function onMouseDown(event) {
            // If we produced a path before, deselect it:
            if (path) {
                path.selected = false;
            }

            // Create a new path and set its stroke color to black:
            path = new Path({
                segments: [event.point],
                strokeColor: 'black',
                // Select the path, so we can see its segment points:
                fullySelected: true
            });
        }

        // While the user drags the mouse, points are added to the path
        // at the position of the mouse:
        function onMouseDrag(event) {

                      pos = event.point;

                      var to_x = pos.x;
                      var to_y = pos.y;
                      if (Math.abs(to_x - last_pos_x) > 15 || Math.abs(to_y - last_pos_y) > 15) {
//                        fabmo.livecodeStart((to_x *.01), (to_y *.01),(err));
                        last_pos_x = to_x;
                        last_pos_y = to_y;
                        path.add(pos)
//                        path.add(event.point);    //original
                        pt_ct++;
                        if (pt_ct > 3) {
                          pt_ct = 0;
                          path.smooth({ type: 'geometric', factor: 0.5, from: seg_ct, to: (seg_ct + 3)});
                          //next_ct = seg_ct + 3;
                          //path.segments.select[seg_ct, next_ct];
                          //path.flatten(.5);
                          seg_ct += 4;
                      }
                        console.log("**nextLoc ", to_x, to_y, pt_ct, seg_ct, path.segments.length);
                      }          

            // Update the content of the text item to show how many
            // segments it has:
            textItem.content = 'Segment count: ' + path.segments.length;
        }


        // When the mouse is released, we simplify the path:
        function onMouseUp(event) {
            path.smooth({ type: 'geometric', factor: 0.5, from: seg_ct, to: (seg_ct + pt_ct)});
            pt_ct = 0;
            seg_ct = 0;
            var segmentCount = path.segments.length;
console.log(path);
            // When the mouse is released, simplify it:
//            path.simplify(10);
//            path.smooth({ type: 'geometric', factor: .5 });
//            path.flatten(.5);

            // Select the path, so we can see its segments:
            path.fullySelected = true;

            var newSegmentCount = path.segments.length;
            var difference = segmentCount - newSegmentCount;
            var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
            textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
        }