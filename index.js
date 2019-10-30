function tick() {
    requestAnimationFrame(tick)
    handleKeys()
    drawScene()
    animate()
}

function webGLStart() {
    let canvas = document.getElementById('mycanvas')
    initGL(canvas)
    initShaders()
    initBuffers()
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.enable(gl.DEPTH_TEST)
    document.onkeydown = handleKeyDown
    document.onkeyup = handleKeyUp

    canvas.onmousedown = handleMouseDown
    document.onmouseup = handleMouseUp
    document.onmousemove = handleMouseMove
    tick()
}