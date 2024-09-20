window.onload = function () {
    let scene, camera, renderer, controls;
    let floatingElements = [];

    const init = () => {
        // Set up scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("scene-container").appendChild(renderer.domElement);
        camera.position.z = 5;

        // Add OrbitControls for interactive camera movement
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        // Add floating elements
        createFloatingElement("About Me", 0, 0, 0);
        createFloatingElement("Projects", 3, 0, 0);
        createFloatingElement("Contact", -3, 0, 0);

        // Add a light source
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        animate();
    };

    const createFloatingElement = (label, x, y, z) => {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        scene.add(cube);
        floatingElements.push({ mesh: cube, label });

        // Add the HTML label
        let labelElement = document.createElement('div');
        labelElement.className = 'floating-label';
        labelElement.innerText = label;
        labelElement.style.position = 'absolute';
        labelElement.style.color = 'black';
        document.getElementById('floating-labels').appendChild(labelElement);

        // Store the label for updating position later
        cube.userData.labelElement = labelElement;
    };

    const animate = () => {
        requestAnimationFrame(animate);

        floatingElements.forEach((element) => {
            element.mesh.rotation.x += 0.01;
            element.mesh.rotation.y += 0.01;

            // Project 3D position to 2D screen position for the label
            let vector = element.mesh.position.clone();
            vector.project(camera);
            let labelPosX = (vector.x * 0.5 + 0.5) * window.innerWidth;
            let labelPosY = (-vector.y * 0.5 + 0.5) * window.innerHeight;
            element.mesh.userData.labelElement.style.left = `${labelPosX}px`;
            element.mesh.userData.labelElement.style.top = `${labelPosY}px`;
        });

        controls.update(); // Needed for OrbitControls
        renderer.render(scene, camera);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    init();
};
