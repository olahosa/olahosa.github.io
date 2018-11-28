			//Width and height
			var w = 400;
			var h = 400;

      var margin = {top: 25, right: 25, bottom: 25, left: 25};
      var innerHeight = h - margin.top - margin.bottom;
      var innerWidth = w - margin.left - margin.right;

      var d = new Date();
      var seconds = d.getSeconds();

      var dataset = d3.range(seconds)
          .map( () => ({x: Math.floor(Math.random() * innerWidth),
                        y: Math.floor(Math.random() * innerHeight)}) );

    // Create SVG element
			var svg = d3.select("body")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

		// Don't change anything above this line.

    // Add background rectangle

			svg.append("rect")
					.attr("x", "0")
					.attr("y", "0")
	        .attr("width", w)
					.attr("height", h)
					.attr("fill", d3.rgb(100, 0, 0));

    // Add initial circles

			var circ = svg.append("g")
				 .attr("id", "circles")
				 .attr("transform", `translate (${margin.left}, ${margin.top})`)
				 .selectAll("circle")
				 .data(dataset);

			circ.enter().append("circle")
				 .attr("cx", d => d.x)
				 .attr("cy", d => d.y)
				 .attr("r", "10")
				 .attr("fill", "red");

    // General Update Pattern (triggered on click)

		var dur = 1000;

		function update(data) {

		// Join the modified dataset to the circles
		 var circ = svg.select("#circles")
			 .selectAll("circle")
				 .data(data);

		 circ.enter().append("circle")		// Entering circles appear in blue.
				 .attr("cx", d => d.x)
				 .attr("cy", d => d.y)
				 .attr("r", "10")
				 .attr("fill", "blue")
			 .merge(circ)								// Entering circles are merged with the update selection,
			 .transition()							// all circles transition to yellow ...
			 	 .delay(dur)
				 .duration(dur)
				 .ease(d3.easeLinear)
				 .attr("cx", d => d.x)
				 .attr("cy", d => d.y)
				 .attr("r", "10")
				 .attr("fill", "yellow")
			 .transition()						//  ... and then back to red
			 	 .delay(dur)
				 .duration(dur)
				 .ease(d3.easeLinear)
				 .attr("cx", d => d.x)
				 .attr("cy", d => d.y)
				 .attr("r", "10")
				 .attr("fill", "red");

		// Exiting circles drop off to the bottom.
		 circ.exit()
				 .transition()
					 .duration(dur)
					 .attr("cy", h)
					 .remove();

		}

		d3.select("h3")
				.on("click", function () {

				// Determine the current number of seconds
				var newd = new Date();
				var newseconds = newd.getSeconds();

				// Modify the dataset to reflect this change.
				if (newseconds > dataset.length) {
						var addedsec = newseconds - dataset.length

						var addeddata = d3.range(addedsec)
								.map( () => ({x: Math.floor(Math.random() * innerWidth),
															y: Math.floor(Math.random() * innerHeight)}) );

						for (var k = 0; k < addeddata.length; k++)
	                { dataset.push(addeddata[k]) }

				} else {
						for (var k = dataset.length; k > newseconds; k--)
									{ dataset.pop() }
				};

			update(dataset);

		});
