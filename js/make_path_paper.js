        var fabmo = new FabMoDashboard();
        var path;

        var last_pos_x = 0;
        var last_pos_y = 0;
        var pos, smooth_pt1, smooth_pt2;
        var err;
        var m_rate;
        var pt_ct = 0, seg_ct = 0, next_ct = 0;
        var len_here = 0;
        var smooth_pt = new Point();


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
                      m_rate = event.delta.length;

                      var to_x = pos.x;
                      var to_y = pos.y;
                      if (Math.abs(to_x - last_pos_x) > (m_rate) || Math.abs(to_y - last_pos_y) > (m_rate)) {
                        last_pos_x = to_x;
                        last_pos_y = to_y;
                        path.add(pos)
//                        path.add(event.point);    //original
                        pt_ct++;
  
                          if (pt_ct > 2* m_rate) {
                            pt_ct = 0;

                            path.smooth({ type: 'continuous', from: seg_ct, to: (seg_ct + 7)});
                            seg_ct += 8;
                            
                            var dist_now = path.length - len_here;

                            for (i = 0; i < 1; i += 0.1) {
                              smooth_pt = path.getPointAt(len_here + (i * dist_now));
                              fabmo.livecodeStart((smooth_pt.x * 0.017), (smooth_pt.y * 0.017),(err));
                            }
                            console.log("**nextLoc ", to_x, to_y, pt_ct, seg_ct, m_rate);

                            len_here = path.length;
                          }
  
                      }          

            // Update the content of the text item to show how many
            // segments it has:
            textItem.content = 'Segment count: ' + path.segments.length;
        }


        // When the mouse is released, we simplify the path:
        function onMouseUp(event) {
//            path.smooth({ type: 'geometric', factor: 0.5, from: seg_ct, to: (seg_ct + pt_ct)});
            pt_ct = 0;
            seg_ct = 0;
            len_here = 0;
            var segmentCount = path.segments.length;
            //console.log(path);
            // When the mouse is released, simplify it:
//            path.simplify(10);
//            path.smooth({ type: 'geometric', factor: .5 });
//            path.flatten(.5);

            // Select the path, so we can see its segments:
            path.fullySelected = true;

            var newSegmentCount = path.segments.length;
            var difference = segmentCount - newSegmentCount;
            var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
            textItem.content = path.length + ' long with ' + segmentCount + ' segments ' + m_rate + ' ck?';
        }