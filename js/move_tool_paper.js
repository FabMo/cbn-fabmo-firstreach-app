        var fabmo = new FabMoDashboard();
        var path;

        var last_pos_x = 0, last_pos_y = 0;
        var tool_x, tool_y;
        var lastTime = new Date();

        var pos, smooth_pt1, smooth_pt2;
        var pt_ct = 0, seg_ct = 0, evt_ct = 0;
        var len_here = 0;
        var smooth_pt = new Point();

        var textItem3 = new PointText({
            content: 'Segment count/length: ',
            point: new Point(20, 30),
            fillColor: 'green',
        });
        var textItem4 = new PointText({
            content: 'Tool Location: ',
            point: new Point(20, 50),
            fillColor: 'green',
        });


        if (canvas2.addEventListener) {
          // IE9, Chrome, Safari, Opera
          canvas2.addEventListener("mousewheel", MouseWheelHandler, false);
          // Firefox
          canvas2.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        }
          var avg_ary = [200,200,200,200,200];
          var avg = 1000;

          function MouseWheelHandler(e) {
            var err, mult;
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));  // cross-browser wheel delta
            var newTime = new Date();
            var interval = newTime.getTime() - lastTime.getTime();
            lastTime = newTime;
 
            avg = avg - avg_ary[evt_ct];
            //pt_ct += delta;
            
            avg = avg + interval;
            avg_ary[evt_ct] = interval;
            evt_ct++;
            if (evt_ct > 4) evt_ct = 0;
            //      interval = Math.min(Math.max(parseInt(interval), 1), 500);
            if (avg < 1000) {
              mult = 0.1;
            } else if (avg < 400) {
              mult = 0.5;
            } else {
              mult = 0.01;
            }
            seg_ct = seg_ct + (delta * mult);
            
            fabmo.livecodeStart(tool_x, seg_ct,(err));
            console.log(delta, seg_ct.toFixed(3), avg, interval);
            return false;
          }


          fabmo.on('status', function(status) {
            tool_x = status.posx;
            tool_y = status.posy;
            circle.position.x = tool_x * 50; 
            circle.position.y = tool_y * 50; 
            textItem4.content = 'Tool Location: ' + tool_x.toFixed(3) + ', ' + tool_y.toFixed(3);
          });

          fabmo.requestStatus();
//          var circle = new Path.Circle((status.posx * 50),(status.posx * 50), 10);
          var circle = new Path.Circle(100,100, 15);
          circle.strokeColor = "black";
          //why not work? seg_ct = tool_y;

          fabmo.getConfig(function(err, cfg) {
            try {
              if(cfg.machine.envelope) {
                //display.setExtents(cfg.machine.envelope);
                //display.gotoExtents(1000);
              }              
            } catch(e) {
              console.error(e);
            }
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
        // function onMouseDrag(event) {

        //               pos = event.point;
        //               m_rate = event.delta.length;

        //               var to_x = pos.x;
        //               var to_y = pos.y;
        //               if (Math.abs(to_x - last_pos_x) > (m_rate) || Math.abs(to_y - last_pos_y) > (m_rate)) {
        //                 last_pos_x = to_x;
        //                 last_pos_y = to_y;
        //                 path.add(pos)
        //                 pt_ct++;
  
        //                   if (pt_ct > 2* m_rate) {
        //                     pt_ct = 0;

        //                     path.smooth({ type: 'continuous', from: seg_ct, to: (seg_ct + 7)});
        //                     seg_ct += 8;
                            
        //                     var dist_now = path.length - len_here;

        //                     for (i = 0; i < 1; i += 0.1) {
        //                       smooth_pt = path.getPointAt(len_here + (i * dist_now));
        //                       fabmo.livecodeStart((smooth_pt.x * 0.02), (smooth_pt.y * 0.02),(err));
        //                     }
        //                     //console.log("**nextLoc ", to_x, to_y, pt_ct, seg_ct, m_rate);

        //                     len_here = path.length;
        //                   }
  
        //               }          

        //     // Update the content of the text item to show how many
        //     // segments it has:
        //     textItem1.content = 'Segment count/length: ' + path.segments.length + ' / ' + path.length.toFixed(3);
        // }


        // // When the mouse is released, we simplify the path:
//         function onMouseUp(event) {
// //            path.smooth({ type: 'geometric', factor: 0.5, from: seg_ct, to: (seg_ct + pt_ct)});
//             pt_ct = 0;
//             seg_ct = 0;
//             len_here = 0;
//             var segmentCount = path.segments.length;
//             //console.log(path);
//             // When the mouse is released, simplify it:
// //            path.simplify(10);
// //            path.smooth({ type: 'geometric', factor: .5 });
// //            path.flatten(.5);

//             // Select the path, so we can see its segments:
//             path.fullySelected = true;

//             var newSegmentCount = path.segments.length;
//             var difference = segmentCount - newSegmentCount;
//             var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
//         }

    // if (evt.preventDefault) //disable default wheel action of scrolling page
    //     evt.preventDefault()
    // else
    //     return false


//Blocking the Mouse Wheel
document.onmousewheel = function(){ stopWheel(); } /* IE7, IE8 */
if(document.addEventListener){ /* Chrome, Safari, Firefox */
    document.addEventListener('DOMMouseScroll', stopWheel, false);
}
 
function stopWheel(e){
    if(!e){ e = window.event; } /* IE7, IE8, Chrome, Safari */
    if(e.preventDefault) { e.preventDefault(); } /* Chrome, Safari, Firefox */
    e.returnValue = false; /* IE7, IE8 */
}
////Re-enabling the Wheel
//document.onmousewheel = null;  /* IE7, IE8 */
//if(document.addEventListener){ /* Chrome, Safari, Firefox */
//    document.removeEventListener('DOMMouseScroll', stopWheel, false);/
//}