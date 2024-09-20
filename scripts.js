window.onload = function () {
    let scene, camera, renderer, controls;
    let floatingElements = [];

    const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("scene-container").appendChild(renderer.domElement);
        camera.position.z = 5;

        // Create floating elements (e.g., cubes representing sections)
        createFloatingElement("About Me", 0, 0, 0);
        createFloatingElement("Projects", 3, 0, 0);
        createFloatingElement("Contact", -3, 0, 0);

        animate();
    };

    const createFloatingElement = (label, x, y, z) => {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        scene.add(cube);
        floatingElements.push({ mesh: cube, label });
    };

    const animate = () => {
        requestAnimationFrame(animate);
        floatingElements.forEach((element) => {
            element.mesh.rotation.x += 0.01;
            element.mesh.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    };

    init();
};
