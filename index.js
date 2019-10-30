let gl

function initGL(canvas) {
    try {
        gl = canvas.getContext('webgl')
        gl.viewportWidth = canvas.width
        gl.viewportHeight = canvas.height
    } catch (e) {
        if (!gl) {
            alert('Tidak bisa menginisialisasi WebGL')
        }
    }
}

function getShader(gl, id) {
    let shaderScript = document.getElementById(id)
    if (!shaderScript) {
        return null
    }
    let str = ''
    let k = shaderScript.firstChild
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent
        }
        k = k.nextSibling
    }
    let shader
    if (shaderScript.type == 'x-shader/x-fragment') {
        shader = gl.createShader(gl.FRAGMENT_SHADER)
    } else if (shaderScript.type = 'x-shader/x-vertex') {
        shader = gl.createShader(gl.VERTEX_SHADER)
    } else {
        return null
    }
    gl.shaderSource(shader, str)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader))
        return null
    }
    return shader
}

let shaderProgram

function initShaders() {
    let fragmentShader = getShader(gl, 'shader-fs')
    let vertexShader = getShader(gl, 'shader-vs')
    shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, fragmentShader)
    gl.attachShader(shaderProgram, vertexShader)
    gl.linkProgram(shaderProgram)
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Tidak bisa menginisialisasi shaders')
    }
    gl.useProgram(shaderProgram)
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute)
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor')
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute)
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix')
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix')
}

let NVertexPositionBuffer
let NVertexColorBuffer
let NVertexIndexBuffer

let cubeVertexPositionBuffer
let cubeVertexColorBuffer
let cubeVertexIndexBuffer

function initBuffers() {
    // N Position
    NVertexPositionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, NVertexPositionBuffer)


    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    NVertexPositionBuffer.itemSize = 3
    NVertexPositionBuffer.numItems = 80

    NVertexColorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, NVertexColorBuffer)
    let colors = []


    for (let i = 0; i < 32; i++) {
        colors = colors.concat([0.6, 0.6, 1.0, 1.0])
    }


    for (let i = 0; i < 8; i++) {
        colors = colors.concat([1.0, 1.0, 0.0, 1.0])
    }


    for (let i = 0; i < 12; i++) {
        colors = colors.concat([0.5, 1.0, 1.0, 1.0])
    }


    for (let i = 0; i < 8; i++) {
        colors = colors.concat([0.5, 0.0, 0.2, 1.0])
    }

    for (let i = 0; i < 12; i++) {
        colors = colors.concat([1.0, 1.0, 1.0, 1.0])
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
    NVertexColorBuffer.itemSize = 4
    NVertexColorBuffer.numItems = 80

    NVertexIndexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NVertexIndexBuffer)
    let NVertexIndices = []
    for (let i = 0; i < 16; i++) {
        NVertexIndices = NVertexIndices.concat([i * 4, i * 4 + 1, i * 4 + 2])
        NVertexIndices = NVertexIndices.concat([i * 4, i * 4 + 2, i * 4 + 3])
    }

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(NVertexIndices), gl.STATIC_DRAW)
    NVertexIndexBuffer.itemSize = 1
    NVertexIndexBuffer.numItems = 96


    cubeVertexPositionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer)
    vertices = [-15.0, -15.0, 15.0, // A 0
        15.0, -15.0, 15.0, // B 1
        15.0, -15.0, -15.0, // C 2
        -15.0, -15.0, -15.0, // D 3
        -15.0, 15.0, 15.0, // E  4
        15.0, 15.0, 15.0, // F 5
        15.0, 15.0, -15.0, // G 6
        -15.0, 15.0, -15.0, // H 7
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    cubeVertexPositionBuffer.itemSize = 3
    cubeVertexPositionBuffer.numItems = 8

    cubeVertexColorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer)
    colors = []
    for (let i = 0; i < vertices.length / 3; i++) {
        colors = colors.concat([1.0, 1.0, 1.0, 1.0])
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
    cubeVertexColorBuffer.itemSize = 4
    cubeVertexColorBuffer.numItems = 8

    cubeVertexIndexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer)
    let cubeVertexIndices = [
        0, 1, 1, 2, 2, 3, 3, 0, // AB, BC, CD, DA 
        4, 5, 5, 6, 6, 7, 4, 7, // EF, FG, GH, EH
        1, 5, 0, 4, 2, 6, 3, 7, // BF, AE, CG, DH
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW)
    cubeVertexIndexBuffer.itemSize = 1
    cubeVertexIndexBuffer.numItems = 24

}

let mvMatrix = mat4.create()
let mvMatrixStack = []
let pMatrix = mat4.create()

function mvPushMatrix() {
    let copy = mat4.create()
    mat4.copy(copy, mvMatrix)
    mvMatrixStack.push(copy)
}

function getProjectedPos(point, projectMat) {
    // point {[x, y, z]} initial position
    // projectMat {mat4} 4x4 projection matrix
    let x, y, z
    x = point[0] * projectMat[0] + point[1] * projectMat[4] + point[2] * projectMat[8] + 1.0 * projectMat[12]
    y = point[0] * projectMat[1] + point[1] * projectMat[5] + point[2] * projectMat[9] + 1.0 * projectMat[13]
    z = point[0] * projectMat[2] + point[1] * projectMat[6] + point[2] * projectMat[10] + 1.0 * projectMat[14]
    return [x, y, z]
}

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix)
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix)
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Tumpukan matriks kosong"
    }
    mvMatrix = mvMatrixStack.pop()
}

function calcPlaneEq(p1, p2, p3) {
    // create 2 vector that lies on plane
    let v1 = vecSubs(p2, p1)
    let v2 = vecSubs(p3, p1)

    // calc norm vec from v1 and v2 cross product as
    // norm vec perpendicular to plane
    let normVec = crossProduct(v1, v2)

    // constant for plane equation
    // dot product from norm vec and any point on plane
    let point = p1.map(x => -x)
    let D = vecMul(normVec, point).reduce((a, b) => a + b, 0)
        // console.log(normVec)
    return normVec.concat(D)
}

function checkCollision(nCurPos) {

    for (let i = 0; i < nCurPos.length; i++) {
        let dist = calcPointPlaneDist(planeEq.top, nCurPos[i])

        if (dist < THRESHOLD &&
            yDir == 1.0
        ) {
            yDir *= -1.0
            nRot *= -1.0
            console.log('Top ' + dist)
            return
        }
    }

    for (let i = 0; i < nCurPos.length; i++) {
        let dist = calcPointPlaneDist(planeEq.bottom, nCurPos[i])

        if (dist < THRESHOLD &&
            yDir == -1.0
        ) {
            yDir *= -1.0
            nRot *= -1.0
            console.log('Bottom ' + dist)
            return
        }
    }

    for (let i = 0; i < nCurPos.length; i++) {
        let dist = calcPointPlaneDist(planeEq.right, nCurPos[i])

        if (dist < THRESHOLD &&
            xDir == 1.0
        ) {
            xDir *= -1.0
            nRot *= -1.0
            console.log('Right ' + dist)
            return
        }
    }

    for (let i = 0; i < nCurPos.length; i++) {
        let dist = calcPointPlaneDist(planeEq.left, nCurPos[i])

        if (dist < THRESHOLD &&
            xDir == -1.0
        ) {
            xDir *= -1.0
            nRot *= -1.0
            console.log('Left ' + dist)
            return
        }
    }

    for (let i = 0; i < nCurPos.length; i++) {
        let dist = calcPointPlaneDist(planeEq.front, nCurPos[i])

        if (dist < THRESHOLD &&
            zDir == 1.0
        ) {
            zDir *= -1.0
            nRot *= -1.0
            console.log('Front ' + dist)
            return
        }
    }

    for (let i = 0; i < nCurPos.length; i++) {
        let dist = calcPointPlaneDist(planeEq.back, nCurPos[i])

        if (dist < THRESHOLD &&
            zDir == -1.0
        ) {
            zDir *= -1.0
            nRot *= -1.0
            console.log('Back ' + dist)
            return
        }
    }
}

let xRot = 0
let xSpeed = 0
let yRot = 0
let ySpeed = 0
let z = -5.0
let rotMatrix = mat4.create()
let xMove = 0.5
let yMove = 0.5
let zMove = 0.5
let rN = 0
let NStartPos = [
    [-2.0, 3.0, 0.0], //3
    [2.0, 3.0, 0.0], //10
    [2.0, -3.0, 0.0], //8
    [-2.0, -3.0, 0.0], //2 
    [-2.0, 3.0, -1.0], //3
    [2.0, 3.0, -1.0], //10
    [2.0, -3.0, -1.0], //8
    [-2.0, -3.0, -1.0], //2 
]

let cubeStartPos = [
    [-15.0, -15.0, 15.0], // A 0
    [15.0, -15.0, 15.0], // B 1
    [15.0, -15.0, -15.0], // C 2
    [-15.0, -15.0, -15.0], // D 3
    [-15.0, 15.0, 15.0], // E  4
    [15.0, 15.0, 15.0], // F 5
    [15.0, 15.0, -15.0], // G 6
    [-15.0, 15.0, -15.0], // H 7
]

let planeEq = {
    top: undefined,
    bottom: undefined,
    front: undefined,
    back: undefined,
    right: undefined,
    left: undefined,
}

function vecSubs(v1, v2) {
    res = []
    if (v1.length != v2.length)
        throw "vector have different shape"
    for (let i = 0; i < v1.length; i++) {
        res.push(v1[i] - v2[i])
    }
    return res
}

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    mat4.perspective(pMatrix, glMatrix.toRadian(45), gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0)
    mat4.identity(mvMatrix)

    mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, -60.0 + z])

    mat4.rotate(mvMatrix, mvMatrix, glMatrix.toRadian(yRot), [0, 1, 0])
    mat4.rotate(mvMatrix, mvMatrix, glMatrix.toRadian(xRot), [1, 0, 0])
    mat4.multiply(mvMatrix, mvMatrix, rotMatrix)
    mvPushMatrix()

    mat4.translate(mvMatrix, mvMatrix, [xMove, yMove, zMove])
    mat4.rotate(mvMatrix, mvMatrix, glMatrix.toRadian(rN), [0.0, 1.0, 0.0])
        // mat4.rotate(mvMatrix, mvMatrix, glMatrix.toRadian(xRot), [1, 0, 0])
        // mat4.rotate(mvMatrix, mvMatrix, glMatrix.toRadian(yRot), [0, 1, 0])
        // mat4.multiply(mvMatrix, mvMatrix, rotMatrix)

    let nCurPos = []
    for (let i = 0; i < NStartPos.length; i++) {
        let temp = getProjectedPos(NStartPos[i], mvMatrix)
        nCurPos.push(temp)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, NVertexPositionBuffer)
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, NVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, NVertexColorBuffer)
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, NVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, NVertexIndexBuffer)

    setMatrixUniforms()
    gl.drawElements(gl.TRIANGLES, NVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0)
    mvPopMatrix()

    mvPushMatrix()
        //mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, 7.5])
        // mat4.rotate(mvMatrix, mvMatrix, glMatrix.toRadian(30), [0.0, 1.0, 0.0])
        // mat4.rotate(mvMatrix, mvMatrix, glMatrix.toRadian(xRot), [1, 0, 0])
        // mat4.rotate(mvMatrix, mvMatrix, glMatrix.toRadian(yRot), [0, 1, 0])
        // mat4.multiply(mvMatrix, mvMatrix, rotMatrix)
    let cubeCurPos = []
    for (let i = 0; i < cubeStartPos.length; i++) {
        let temp = getProjectedPos(cubeStartPos[i], mvMatrix)
        cubeCurPos.push(temp)
    }
    // Cube skeleton
    //      H             G
    // E            F
    // 
    // 
    //      D             C
    // A            B
    planeEq.top = calcPlaneEq(cubeCurPos[4], cubeCurPos[5], cubeCurPos[6]) // E, F, G
    planeEq.bottom = calcPlaneEq(cubeCurPos[0], cubeCurPos[1], cubeCurPos[2]) // A, B, C
    planeEq.right = calcPlaneEq(cubeCurPos[1], cubeCurPos[2], cubeCurPos[5]) // B, C, F
    planeEq.left = calcPlaneEq(cubeCurPos[0], cubeCurPos[3], cubeCurPos[4]) // A, D, E
    planeEq.front = calcPlaneEq(cubeCurPos[0], cubeCurPos[1], cubeCurPos[4]) // A, B, E
    planeEq.back = calcPlaneEq(cubeCurPos[2], cubeCurPos[3], cubeCurPos[6]) // C, D, G
        // console.log(planeEq)
    checkCollision(nCurPos)

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer)
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer)
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer)

    setMatrixUniforms()
    gl.drawElements(gl.LINES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0)
    mvPopMatrix()
}

function animate() {
    let timeNow = new Date().getTime()
    if (lastTime != 0) {
        let elapsed = timeNow - lastTime
        rN += (90 * nRot * elapsed) / 1000.0
        xMove += (xDir * 5 * elapsed) / 1000.0
        yMove += (yDir * 5 * elapsed) / 1000.0
        zMove += (zDir * 5 * elapsed) / 1000.0
        xRot += (xSpeed * elapsed) / 1000.0
        yRot += (ySpeed * elapsed) / 1000.0
    }
    lastTime = timeNow
}

function tick() {
    requestAnimationFrame(tick)
        //handleKeys()
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
    tick()
}