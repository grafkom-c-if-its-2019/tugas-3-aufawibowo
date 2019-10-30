(function() {

    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var program, program2, program3, program4;

    glUtils.SL.init({ callback: function() { main(); } });

    function main() {
        // Register Callbacks
        window.addEventListener('resize', resizer);

        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);

        // Initialize the shaders and program
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
            vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
            vertexShader3 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex),
            vertexShader4 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v4.vertex),
            fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);

        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
        program3 = glUtils.createProgram(gl, vertexShader3, fragmentShader);
        program4 = glUtils.createProgram(gl, vertexShader4, fragmentShader);


        var thetaLoc = gl.getUniformLocation(program, 'theta');
        var theta = 0;
        var thetaLoc1 = gl.getUniformLocation(program3, 'theta1');
        var theta1 = 0;
        var scaleLoc = gl.getUniformLocation(program2, 'scale');
        var scale = 1;
        var membesar = 1;
        var scaleLoc1 = gl.getUniformLocation(program4, 'scale1');
        var scale1 = 1;
        var membesar1 = 1;

        function render() {
            gl.clearColor(0, 0, 0, 1);
            gl.colorMask(true, true, true, true);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);
            drawline();
            theta += 0.0184;
            gl.uniform1f(thetaLoc, theta);
            gl.drawArrays(gl.LINE_LOOP, 0, 8);


            gl.useProgram(program2);
            drawtriangle();
            if (scale >= 1) membesar = -1;
            else if (scale <= -1) membesar = 1;
            scale = scale + (membesar * 0.0184);
            gl.uniform1f(scaleLoc, scale);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);

            gl.useProgram(program3);
            drawline2();
            theta1 += 0.0184;
            gl.uniform1f(thetaLoc1, theta1);
            gl.drawArrays(gl.LINE_LOOP, 0, 3);

            gl.useProgram(program4);
            drawtriangle2();
            if (scale1 >= 1) membesar1 = -1;
            else if (scale1 <= -1) membesar1 = 1;
            scale1 = scale1 + (membesar1 * 0.0184);
            gl.uniform1f(scaleLoc1, scale1);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);



            requestAnimationFrame(render);
        }

        function drawline() {
            var lineVertices = [-0.7, -0.5, 1.0, 1.0, 0.0, -0.6, -0.5, 0.2, 0.2, 1.0, -0.55, -0.2, 0.6, 1.0, 0.6, -0.45, -0.2, 0.1, 0.7, 1.0, -0.4, -0.5, 0.7, 0.1, 1.0, -0.3, -0.5, 1.0, 0.0, 0.5, -0.45, 0.3, 0.7, 0.5, 1.0, -0.55, 0.3, 0.4, 0.5, 1.0];
            var lineVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program, 'vPosition');
            var vColor = gl.getAttribLocation(program, 'vColor');
            gl.vertexAttribPointer(
                vPosition,
                2, // jumlah elemen per attribute
                gl.FLOAT, // tipe data attribut
                gl.FALSE, // default
                5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
                0 // offset dari posisi elemen di array
            );
            gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
                5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

            gl.enableVertexAttribArray(vPosition);
            gl.enableVertexAttribArray(vColor);

        }

        function drawline2() {

            var lineVertices2 = [-0.525, -0.05, 1.0, 1.0, 0.0, -0.45, -0.2, 0.2, 0.2, 1.0, -0.5, 0.15, 0.1, 0.5, 0.6];

            var lineVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices2), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program, 'vPosition');
            var vColor = gl.getAttribLocation(program, 'vColor');
            gl.vertexAttribPointer(
                vPosition,
                2, // jumlah elemen per attribute
                gl.FLOAT, // tipe data attribut
                gl.FALSE, // default
                5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
                0 // offset dari posisi elemen di array
            );
            gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
                5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

            gl.enableVertexAttribArray(vPosition);
            gl.enableVertexAttribArray(vColor);

        }

        function drawtriangle() {
            var triangleVertices = [
                0.4, 0.15, 2.0, 1.0, 0.0,
                0.3, -0.5, 0.7, 1.0, 0.6,
                0.2, -0.5, 0.3, 1.0, 0.6,
                0.35, 0.3, 1.0, 1.0, 0.0,
                0.45, 0.3, 0.4, 0.0, 1.0,
                0.6, -0.5, 1.0, 1.0, 0.5,
                0.5, -0.5, 0.2, 0.0, 1.0
                // 0.45,-0.2, 0.7,0.0,1.0,
                //  0.35,-0.2, 0.1,1.0,0.6

            ];
            var triangleVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program2, 'vPosition');
            var vColor = gl.getAttribLocation(program2, 'vColor');
            gl.vertexAttribPointer(
                vPosition,
                2, // jumlah elemen per attribute
                gl.FLOAT, // tipe data attribut
                gl.FALSE, // default
                5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
                0 // offset dari posisi elemen di array
            );
            gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
                5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

            gl.enableVertexAttribArray(vPosition);
            gl.enableVertexAttribArray(vColor);

        }

        function drawtriangle2() {
            var triangleVertices2 = [
                0.345, -0.2, 0.7, 1.0, 0.6,
                0.45, -0.2, 0.3, 1.0, 0.2,
                0.368, -0.05, 0.2, 1.0, 0.7
            ];
            var triangleVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices2), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program2, 'vPosition');
            var vColor = gl.getAttribLocation(program2, 'vColor');
            gl.vertexAttribPointer(
                vPosition,
                2, // jumlah elemen per attribute
                gl.FLOAT, // tipe data attribut
                gl.FALSE, // default
                5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
                0 // offset dari posisi elemen di array
            );
            gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
                5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

            gl.enableVertexAttribArray(vPosition);
            gl.enableVertexAttribArray(vColor);

        }

        resizer();
        render();
    }

    function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

})(window || this);