// 3D Environment Module
const THREE = window.THREE;

class Environment3D {
    constructor(containerId, characterData) {
        this.container = document.getElementById(containerId);
        this.characterData = characterData;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.character = null;
        this.equipment = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.isInitialized = false;

        this.init();
    }

    init() {
        if (!this.container) {
            throw new Error('3D Environment container not found');
        }

        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.createEnvironment();
        this.createCharacter();
        this.createEquipment();
        this.setupEventListeners();
        this.animate();

        this.isInitialized = true;
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a3a); // Lighter mystical blue
        this.scene.fog = new THREE.Fog(0x1a1a3a, 10, 50);
    }

    setupCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('3d-canvas'),
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x4a4a8a, 0.4);
        this.scene.add(ambientLight);

        // Directional light (mystical energy)
        const directionalLight = new THREE.DirectionalLight(0x8a2be2, 0.6);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point light for arcane atmosphere
        const pointLight = new THREE.PointLight(0x00ffff, 0.8, 15);
        pointLight.position.set(0, 3, 0);
        this.scene.add(pointLight);

        // Create particle system for magical atmosphere
        this.createParticleSystem();
    }

    createParticleSystem() {
        const particleCount = 150;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Random positions in a sphere around the character
            const radius = 8 + Math.random() * 6;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Mystical AI colors (purple, cyan, blue, and white particles)
            const colorChoices = [0x8a2be2, 0x00ffff, 0x4169e1, 0xffffff, 0xff1493];
            const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
            
            colors[i * 3] = ((color >> 16) & 255) / 255;
            colors[i * 3 + 1] = ((color >> 8) & 255) / 255;
            colors[i * 3 + 2] = (color & 255) / 255;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particleSystem = new THREE.Points(particles, particleMaterial);
        this.scene.add(this.particleSystem);
    }

    createEnvironment() {
        // Ground with mystical patterns
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshLambertMaterial({
            color: 0x2a2a4e,
            transparent: true,
            opacity: 0.9
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Add mystical ground patterns
        this.createGroundPatterns();

        // Walls with arcane symbols
        const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x26213e });

        // Back wall
        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 8),
            wallMaterial
        );
        backWall.position.set(0, 4, -10);
        backWall.receiveShadow = true;
        this.scene.add(backWall);

        // Side walls
        const leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 8),
            wallMaterial
        );
        leftWall.position.set(-10, 4, 0);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.receiveShadow = true;
        this.scene.add(leftWall);

        const rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 8),
            wallMaterial
        );
        rightWall.position.set(10, 4, 0);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.receiveShadow = true;
        this.scene.add(rightWall);

        // Add mystical wall decorations
        this.createWallDecorations();
    }

    createGroundPatterns() {
        // Create mathematical symbols and neural network patterns on the ground
        const symbols = ['∑', '∫', 'π', '∞', '∇', '∂', '∅', '∈'];
        const positions = [
            [-5, 0.01, -5], [5, 0.01, -5], [-5, 0.01, 5], [5, 0.01, 5],
            [-3, 0.01, -3], [3, 0.01, -3], [-3, 0.01, 3], [3, 0.01, 3]
        ];

        positions.forEach((pos, index) => {
            const symbol = symbols[index % symbols.length];
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#00ffff';
            ctx.font = '48px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, 32, 32);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.7
            });
            
            const geometry = new THREE.PlaneGeometry(1, 1);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(pos[0], pos[1], pos[2]);
            mesh.rotation.x = -Math.PI / 2;
            this.scene.add(mesh);
        });
    }

    createWallDecorations() {
        // Add neural network patterns to walls
        const wallPositions = [
            { pos: [0, 4, -9.9], rot: [0, 0, 0] },
            { pos: [-9.9, 4, 0], rot: [0, Math.PI / 2, 0] },
            { pos: [9.9, 4, 0], rot: [0, -Math.PI / 2, 0] }
        ];

        wallPositions.forEach(wall => {
            this.createNeuralNetworkPattern(wall.pos, wall.rot);
        });
    }

    createNeuralNetworkPattern(position, rotation) {
        const group = new THREE.Group();
        
        // Create nodes
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
                const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                node.position.set((i - 2) * 0.8, (j - 1) * 0.8, 0);
                group.add(node);
            }
        }

        // Create connections
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    const startPos = new THREE.Vector3((i - 2) * 0.8, (j - 1) * 0.8, 0);
                    const endPos = new THREE.Vector3((i - 1) * 0.8, (k - 1) * 0.8, 0);
                    
                    const connectionGeometry = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
                    const connectionMaterial = new THREE.LineBasicMaterial({ color: 0x8a2be2, opacity: 0.6, transparent: true });
                    const connection = new THREE.Line(connectionGeometry, connectionMaterial);
                    group.add(connection);
                }
            }
        }

        group.position.set(position[0], position[1], position[2]);
        group.rotation.set(rotation[0], rotation[1], rotation[2]);
        this.scene.add(group);
    }

    createCharacter() {
        // Create a detailed AI-mancer character representation
        const characterGroup = new THREE.Group();

        // Body (torso) - mystical robes
        const torsoGeometry = new THREE.CylinderGeometry(0.6, 0.5, 1.8, 12);
        const torsoMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4a148c,
            roughness: 0.8,
            metalness: 0.1
        });
        const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
        torso.position.y = 1.2;
        torso.castShadow = true;
        characterGroup.add(torso);

        // Robe overlay with arcane symbols
        const robeGeometry = new THREE.CylinderGeometry(0.55, 0.45, 1.2, 12);
        const robeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6a1b9a,
            roughness: 0.6,
            metalness: 0.2
        });
        const robe = new THREE.Mesh(robeGeometry, robeMaterial);
        robe.position.y = 1.4;
        robe.castShadow = true;
        characterGroup.add(robe);

        // Head with mystical aura
        const headGeometry = new THREE.SphereGeometry(0.35, 16, 16);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf4d03f,
            roughness: 0.7,
            metalness: 0.1
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2.2;
        head.castShadow = true;
        characterGroup.add(head);

        // Mystical hood
        const hoodGeometry = new THREE.ConeGeometry(0.4, 0.6, 12);
        const hoodMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2c1810,
            roughness: 0.9,
            metalness: 0.0
        });
        const hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
        hood.position.y = 2.5;
        hood.castShadow = true;
        characterGroup.add(hood);

        // Arms with flowing sleeves
        const armGeometry = new THREE.CylinderGeometry(0.15, 0.12, 1.2, 8);
        const armMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4a148c,
            roughness: 0.8,
            metalness: 0.1
        });

        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.8, 1.3, 0);
        leftArm.rotation.z = 0.3;
        leftArm.castShadow = true;
        characterGroup.add(leftArm);

        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.8, 1.3, 0);
        rightArm.rotation.z = -0.3;
        rightArm.castShadow = true;
        characterGroup.add(rightArm);

        // Mystical staff
        const staffGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8);
        const staffMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b4513,
            roughness: 0.9,
            metalness: 0.0
        });
        const staff = new THREE.Mesh(staffGeometry, staffMaterial);
        staff.position.set(1.2, 0.5, 0);
        staff.rotation.z = -0.2;
        staff.castShadow = true;
        characterGroup.add(staff);

        // Staff orb (neural network core)
        const orbGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const orbMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.8
        });
        const orb = new THREE.Mesh(orbGeometry, orbMaterial);
        orb.position.set(1.2, 1.8, 0);
        orb.castShadow = true;
        characterGroup.add(orb);

        // Add mystical aura around the character
        this.createCharacterAura(characterGroup);

        // Add arcane symbols floating around the character
        this.createFloatingSymbols(characterGroup);

        // Make character interactive
        characterGroup.userData = { type: 'character' };
        characterGroup.position.set(0, 0, 0);

        this.character = characterGroup;
        this.scene.add(this.character);
    }

    createCharacterAura(characterGroup) {
        // Create a mystical aura effect around the character
        const auraGeometry = new THREE.SphereGeometry(1.5, 16, 16);
        const auraMaterial = new THREE.MeshBasicMaterial({
            color: 0x8a2be2,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const aura = new THREE.Mesh(auraGeometry, auraMaterial);
        aura.position.y = 1.2;
        characterGroup.add(aura);
    }

    createFloatingSymbols(characterGroup) {
        // Create floating mathematical and arcane symbols around the character
        const symbols = ['∑', '∫', 'π', '∞', '∇', '∂', '∅', '∈', '🧠', '⚡', '🔮'];
        const positions = [
            [-1.5, 2, 0], [1.5, 2, 0], [0, 3, 0], [-1, 1.5, 1], [1, 1.5, 1],
            [-1, 1.5, -1], [1, 1.5, -1], [0, 0.5, 1.5], [0, 0.5, -1.5]
        ];

        positions.forEach((pos, index) => {
            const symbol = symbols[index % symbols.length];
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#00ffff';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, 16, 16);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.8
            });
            
            const geometry = new THREE.PlaneGeometry(0.5, 0.5);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(pos[0], pos[1], pos[2]);
            characterGroup.add(mesh);
        });
    }

    createEquipment() {
        // Create AI-mancer equipment distributed throughout the environment
        const equipmentPositions = [
            // Worn equipment (moved away from character to avoid click interference)
            { item: this.characterData.equipment[0], position: [-2, 1.5, 1] }, // Neural Network Staff
            { item: this.characterData.equipment[1], position: [2, 1.5, 1] },  // Optimization Orb
            
            // Environmental equipment (scattered around)
            { item: this.characterData.equipment[2], position: [-3, 0.5, -2] },    // Agent Summoning Crystal
            { item: this.characterData.equipment[3], position: [3, 0.5, -2] },     // TensorFlow Grimoire
            { item: this.characterData.equipment[4], position: [-3, 0.5, 2] },     // PyTorch Catalyst
            { item: this.characterData.equipment[5], position: [3, 0.5, 2] },      // Mathematical Matrix
            { item: this.characterData.equipment[6], position: [-2, 0.5, 0] },     // Probability Prism
            { item: this.characterData.equipment[7], position: [2, 0.5, 0] }       // Reinforcement Learning Relic
        ];

        equipmentPositions.forEach(({ item, position }, index) => {
            const equipmentMesh = this.createEquipmentMesh(item, position);
            equipmentMesh.userData = { 
                type: 'equipment', 
                item: item,
                index: index
            };
            this.equipment.push(equipmentMesh);
            this.scene.add(equipmentMesh);
        });
    }

    createEquipmentMesh(item, position) {
        const group = new THREE.Group();
        
        // Create mystical equipment based on type
        switch (item.name) {
            case 'Neural Network Staff':
                this.createNeuralNetworkStaff(group);
                break;
            case 'Optimization Orb':
                this.createOptimizationOrb(group);
                break;
            case 'Agent Summoning Crystal':
                this.createSummoningCrystal(group);
                break;
            case 'TensorFlow Grimoire':
                this.createTensorFlowGrimoire(group);
                break;
            case 'PyTorch Catalyst':
                this.createPyTorchCatalyst(group);
                break;
            case 'Mathematical Matrix':
                this.createMathematicalMatrix(group);
                break;
            case 'Probability Prism':
                this.createProbabilityPrism(group);
                break;
            case 'Reinforcement Learning Relic':
                this.createReinforcementRelic(group);
                break;
            default:
                this.createGenericToolModel(group, item);
        }

        group.position.set(position[0], position[1], position[2]);
        return group;
    }

    createNeuralNetworkStaff(group) {
        // Create a mystical staff with neural network patterns
        const staffGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
        const staffMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b4513,
            roughness: 0.9,
            metalness: 0.0
        });
        const staff = new THREE.Mesh(staffGeometry, staffMaterial);
        group.add(staff);

        // Neural network orb at the top
        const orbGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const orbMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
        });
        const orb = new THREE.Mesh(orbGeometry, orbMaterial);
        orb.position.y = 1.2;
        group.add(orb);

        // Add neural network connections
        for (let i = 0; i < 8; i++) {
            const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 1.2, 0),
                new THREE.Vector3(
                    Math.cos(i * Math.PI / 4) * 0.4,
                    1.2 + Math.sin(i * Math.PI / 4) * 0.2,
                    Math.sin(i * Math.PI / 4) * 0.4
                )
            ]);
            const connectionMaterial = new THREE.LineBasicMaterial({ 
                color: 0x8a2be2,
                opacity: 0.8,
                transparent: true
            });
            const connection = new THREE.Line(connectionGeometry, connectionMaterial);
            group.add(connection);
        }
    }

    createOptimizationOrb(group) {
        // Create a glowing optimization orb
        const orbGeometry = new THREE.SphereGeometry(0.4, 16, 16);
        const orbMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xff1493,
            emissive: 0xff1493,
            emissiveIntensity: 0.4,
            transparent: true,
            opacity: 0.9
        });
        const orb = new THREE.Mesh(orbGeometry, orbMaterial);
        group.add(orb);

        // Add optimization symbols floating around
        const symbols = ['∇', '∂', 'min', 'max'];
        symbols.forEach((symbol, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#ff1493';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, 16, 16);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.8
            });
            
            const geometry = new THREE.PlaneGeometry(0.3, 0.3);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                Math.cos(index * Math.PI / 2) * 0.6,
                Math.sin(index * Math.PI / 2) * 0.6,
                0
            );
            group.add(mesh);
        });
    }

    createSummoningCrystal(group) {
        // Create a mystical crystal for summoning agents
        const crystalGeometry = new THREE.OctahedronGeometry(0.3);
        const crystalMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4169e1,
            emissive: 0x4169e1,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.8
        });
        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        group.add(crystal);

        // Add summoning runes
        const runes = ['🔮', '⚡', '🧠'];
        runes.forEach((rune, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#4169e1';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(rune, 16, 16);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9
            });
            
            const geometry = new THREE.PlaneGeometry(0.4, 0.4);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                Math.cos(index * Math.PI * 2 / 3) * 0.5,
                Math.sin(index * Math.PI * 2 / 3) * 0.5,
                0.3
            );
            group.add(mesh);
        });
    }

    createTensorFlowGrimoire(group) {
        // Create a mystical book with TensorFlow symbols
        const bookGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
        const bookMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b4513,
            roughness: 0.8,
            metalness: 0.1
        });
        const book = new THREE.Mesh(bookGeometry, bookMaterial);
        group.add(book);

        // Add TensorFlow symbols on the cover
        const symbols = ['TF', '∑', '∫'];
        symbols.forEach((symbol, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#ffd700';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, 16, 16);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9
            });
            
            const geometry = new THREE.PlaneGeometry(0.2, 0.2);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (index - 1) * 0.2,
                0.2,
                0.06
            );
            group.add(mesh);
        });
    }

    createPyTorchCatalyst(group) {
        // Create a dynamic PyTorch catalyst
        const catalystGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const catalystMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xff4500,
            emissive: 0xff4500,
            emissiveIntensity: 0.4,
            transparent: true,
            opacity: 0.8
        });
        const catalyst = new THREE.Mesh(catalystGeometry, catalystMaterial);
        group.add(catalyst);

        // Add dynamic energy particles
        for (let i = 0; i < 6; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const particleMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xff4500,
                transparent: true,
                opacity: 0.6
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                Math.cos(i * Math.PI / 3) * 0.5,
                Math.sin(i * Math.PI / 3) * 0.5,
                0
            );
            group.add(particle);
        }
    }

    createMathematicalMatrix(group) {
        // Create a mathematical matrix display
        const matrixGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
        const matrixMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2c1810,
            roughness: 0.9,
            metalness: 0.0
        });
        const matrix = new THREE.Mesh(matrixGeometry, matrixMaterial);
        group.add(matrix);

        // Add matrix elements
        const elements = ['1', '0', '1', '0', '1', '1', '0', '1', '0'];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const canvas = document.createElement('canvas');
                canvas.width = 32;
                canvas.height = 32;
                const ctx = canvas.getContext('2d');
                
                ctx.fillStyle = '#00ffff';
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(elements[i * 3 + j], 16, 16);

                const texture = new THREE.CanvasTexture(canvas);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.9
                });
                
                const geometry = new THREE.PlaneGeometry(0.15, 0.15);
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    (j - 1) * 0.2,
                    (1 - i) * 0.2,
                    0.06
                );
                group.add(mesh);
            }
        }
    }

    createProbabilityPrism(group) {
        // Create a probability prism
        const prismGeometry = new THREE.ConeGeometry(0.3, 0.6, 6);
        const prismMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x9932cc,
            emissive: 0x9932cc,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.8
        });
        const prism = new THREE.Mesh(prismGeometry, prismMaterial);
        group.add(prism);

        // Add probability symbols
        const symbols = ['P', 'π', '∞'];
        symbols.forEach((symbol, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#9932cc';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, 16, 16);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9
            });
            
            const geometry = new THREE.PlaneGeometry(0.3, 0.3);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                Math.cos(index * Math.PI * 2 / 3) * 0.4,
                Math.sin(index * Math.PI * 2 / 3) * 0.4,
                0.4
            );
            group.add(mesh);
        });
    }

    createReinforcementRelic(group) {
        // Create a reinforcement learning relic
        const relicGeometry = new THREE.TorusGeometry(0.3, 0.1, 8, 16);
        const relicMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffd700,
            emissive: 0xffd700,
            emissiveIntensity: 0.3,
            metalness: 0.8,
            roughness: 0.2
        });
        const relic = new THREE.Mesh(relicGeometry, relicMaterial);
        group.add(relic);

        // Add reward symbols
        const symbols = ['🎯', '⭐', '🏆'];
        symbols.forEach((symbol, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#ffd700';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbol, 16, 16);

            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9
            });
            
            const geometry = new THREE.PlaneGeometry(0.3, 0.3);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                Math.cos(index * Math.PI * 2 / 3) * 0.4,
                Math.sin(index * Math.PI * 2 / 3) * 0.4,
                0
            );
            group.add(mesh);
        });
    }

    createGenericToolModel(group, item) {
        // Generic tool representation
        const toolGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
        const toolMaterial = new THREE.MeshLambertMaterial({ 
            color: this.getEquipmentColor(item.name),
            roughness: 0.7
        });
        const tool = new THREE.Mesh(toolGeometry, toolMaterial);
        tool.castShadow = true;
        group.add(tool);

        // Tool head
        const toolHeadGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const toolHeadMaterial = new THREE.MeshLambertMaterial({ 
            color: this.getEquipmentColor(item.name),
            metalness: 0.3
        });
        const toolHead = new THREE.Mesh(toolHeadGeometry, toolHeadMaterial);
        toolHead.position.y = 0.45;
        toolHead.castShadow = true;
        group.add(toolHead);
    }

    getEquipmentColor(name) {
        const colors = {
            'Python': 0x3776ab,
            'JavaScript': 0xf7df1e,
            'React': 0x61dafb,
            'Node.js': 0x339933,
            'Docker': 0x2496ed,
            'Git': 0xf05032,
            'AWS': 0xff9900,
            'PostgreSQL': 0x336791
        };
        return colors[name] || 0x808080;
    }

    setupEventListeners() {
        // Mouse move for hover detection
        this.container.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        });

        // Mouse click for character interaction
        this.container.addEventListener('click', (event) => {
            this.onMouseClick(event);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }

    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;

        this.checkEquipmentHover();
    }

    onMouseClick(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;

            // Check if character was clicked
            if (object.userData.type === 'character' ||
                (object.parent && object.parent.userData.type === 'character')) {
                this.openDialogueWindow();
            }
        }
    }

    checkEquipmentHover() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Get all equipment and their children for intersection testing
        const equipmentToTest = [];
        this.equipment.forEach(equipmentGroup => {
            equipmentToTest.push(equipmentGroup);
            // Add all children recursively
            const addChildren = (obj) => {
                obj.children.forEach(child => {
                    equipmentToTest.push(child);
                    addChildren(child);
                });
            };
            addChildren(equipmentGroup);
        });
        
        const intersects = this.raycaster.intersectObjects(equipmentToTest, true);

        // Reset all equipment to normal scale
        this.equipment.forEach(item => {
            if (item.userData.isHovered) {
                item.userData.isHovered = false;
                item.scale.set(1, 1, 1);
            }
        });

        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            
            // Find the parent equipment group
            let equipmentGroup = null;
            if (intersectedObject.userData.type === 'equipment') {
                equipmentGroup = intersectedObject;
            } else {
                // Check if any parent has equipment type
                let parent = intersectedObject.parent;
                while (parent) {
                    if (parent.userData.type === 'equipment') {
                        equipmentGroup = parent;
                        break;
                    }
                    parent = parent.parent;
                }
            }
            
            if (equipmentGroup) {
                this.showEquipmentTooltip(equipmentGroup.userData.item);
                
                // Add hover effect to the equipment
                if (!equipmentGroup.userData.isHovered) {
                    equipmentGroup.userData.isHovered = true;
                    equipmentGroup.scale.set(1.2, 1.2, 1.2);
                }
            }
        } else {
            this.hideEquipmentTooltip();
        }
    }

    showEquipmentTooltip(item) {
        const equipmentTooltip = document.getElementById('equipment-tooltip');
        const icon = equipmentTooltip.querySelector('.tooltip-icon');
        const name = equipmentTooltip.querySelector('.tooltip-name');
        const description = equipmentTooltip.querySelector('.tooltip-description');

        icon.textContent = item.icon;
        name.textContent = item.name;
        description.textContent = item.description;

        // Position tooltip near mouse cursor
        const rect = this.container.getBoundingClientRect();
        const mouseX = this.mouse.x * (this.container.clientWidth / 2) + (this.container.clientWidth / 2);
        const mouseY = -this.mouse.y * (this.container.clientHeight / 2) + (this.container.clientHeight / 2);
        
        // Convert to page coordinates
        const pageX = rect.left + mouseX;
        const pageY = rect.top + mouseY;
        
        // Position tooltip with offset
        equipmentTooltip.style.left = (pageX + 15) + 'px';
        equipmentTooltip.style.top = (pageY - 15) + 'px';

        equipmentTooltip.classList.remove('hidden');
    }

    hideEquipmentTooltip() {
        const equipmentTooltip = document.getElementById('equipment-tooltip');
        equipmentTooltip.classList.add('hidden');
    }

    openDialogueWindow() {
        const dialogueWindow = document.getElementById('dialogue-window');
        dialogueWindow.classList.remove('hidden');

        // Populate dialogue content
        this.populateDialogueContent();
    }

    populateDialogueContent() {
        // Populate lore
        const loreContent = document.querySelector('#lore-tab .lore-content');
        loreContent.innerHTML = `<p>${this.characterData.lore}</p>`;

        // Populate skills
        const skillsContent = document.querySelector('#skills-tab .skills-content');
        skillsContent.innerHTML = '';

        Object.entries(this.characterData.skills).forEach(([skill, rating]) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-name">${skill}</span>
                <div class="skill-rating">${this.generateStars(rating)}</div>
            `;
            skillsContent.appendChild(skillItem);
        });
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<span class="skill-star ${i <= rating ? 'filled' : 'empty'}">★</span>`;
        }
        return stars;
    }

    onWindowResize() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001; // Time in seconds

        // Character breathing animation
        if (this.character) {
            // Gentle rotation
            this.character.rotation.y += 0.005;
            
            // Breathing effect - subtle up and down movement
            const breathingOffset = Math.sin(time * 2) * 0.02;
            this.character.position.y = breathingOffset;
            
            // Cape swaying
            const cape = this.character.children.find(child => 
                child.geometry && child.geometry.type === 'ConeGeometry'
            );
            if (cape) {
                cape.rotation.z = Math.sin(time * 1.5) * 0.1;
            }
        }

        // Equipment animations
        this.equipment.forEach((item, index) => {
            // Base rotation
            item.rotation.y += 0.01 + (index * 0.002);
            
            // Floating animation with different phases
            const floatOffset = Math.sin(time * 1.5 + index * 0.5) * 0.05;
            item.position.y = item.userData.originalY || 0.5 + floatOffset;
            
            // Store original Y position if not already stored
            if (!item.userData.originalY) {
                item.userData.originalY = item.position.y;
            }
            
            // Special animations for specific equipment
            this.animateSpecificEquipment(item, time, index);
        });

        // Camera gentle movement
        if (this.camera) {
            const cameraOffset = Math.sin(time * 0.5) * 0.1;
            this.camera.position.x = cameraOffset;
        }

        // Animate particles
        if (this.particleSystem) {
            const positions = this.particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                // Gentle floating motion
                positions[i + 1] += Math.sin(time + i) * 0.001;
                
                // Orbital motion around the character
                const angle = time * 0.5 + i * 0.1;
                const radius = 8 + Math.sin(time + i) * 0.5;
                positions[i] = Math.cos(angle) * radius;
                positions[i + 2] = Math.sin(angle) * radius;
            }
            this.particleSystem.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }

    animateSpecificEquipment(item, time, index) {
        const itemName = item.userData.item?.name?.toLowerCase();
        
        switch(itemName) {
            case 'python':
                // Snake slithering animation
                const snake = item.children.find(child => 
                    child.geometry && child.geometry.type === 'TorusGeometry'
                );
                if (snake) {
                    snake.rotation.z = Math.sin(time * 2) * 0.3;
                }
                break;
                
            case 'javascript':
                // Lightning flicker
                const lightning = item.children.find(child => 
                    child.geometry && child.geometry.type === 'ShapeGeometry'
                );
                if (lightning && lightning.material) {
                    lightning.material.emissiveIntensity = 0.2 + Math.sin(time * 8) * 0.1;
                }
                break;
                
            case 'react':
                // Electron orbit animation
                const electrons = item.children.filter(child => 
                    child.geometry && child.geometry.type === 'SphereGeometry' && 
                    child.material.emissiveIntensity > 0
                );
                electrons.forEach((electron, i) => {
                    const orbitRadius = 0.2;
                    const speed = 2 + i * 0.5;
                    const angle = time * speed + i * Math.PI / 2;
                    electron.position.x = Math.cos(angle) * orbitRadius;
                    electron.position.z = Math.sin(angle) * orbitRadius;
                });
                break;
                
            case 'node.js':
                // Pulsing node
                const nodeJSCenter = item.children.find(child => 
                    child.geometry && child.geometry.type === 'SphereGeometry' &&
                    child.material.emissiveIntensity > 0
                );
                if (nodeJSCenter && nodeJSCenter.material) {
                    nodeJSCenter.material.emissiveIntensity = 0.1 + Math.sin(time * 3) * 0.05;
                }
                break;
                
            case 'docker':
                // Whale swimming motion
                const whale = item.children.find(child => 
                    child.geometry && child.geometry.type === 'SphereGeometry' &&
                    child.scale.x > 1
                );
                if (whale) {
                    whale.rotation.y = Math.sin(time * 1.2) * 0.2;
                }
                break;
                
            case 'git':
                // Branch swaying
                const branches = item.children.filter(child => 
                    child.geometry && child.geometry.type === 'CylinderGeometry' &&
                    child.position.x !== 0
                );
                branches.forEach((branch, i) => {
                    branch.rotation.z = (i === 0 ? Math.PI / 6 : -Math.PI / 6) + 
                                      Math.sin(time * 1.8 + i) * 0.1;
                });
                break;
                
            case 'aws':
                // Cloud pulsing and lightning
                const cloud = item.children.find(child => 
                    child.geometry && child.geometry.type === 'SphereGeometry' &&
                    child.scale.x > 1
                );
                if (cloud) {
                    const scale = 1 + Math.sin(time * 2) * 0.05;
                    cloud.scale.set(1.2 * scale, 0.8 * scale, scale);
                }
                
                const awsLightning = item.children.find(child => 
                    child.geometry && child.geometry.type === 'CylinderGeometry' &&
                    child.material.emissiveIntensity > 0
                );
                if (awsLightning && awsLightning.material) {
                    awsLightning.material.emissiveIntensity = 0.3 + Math.sin(time * 6) * 0.2;
                }
                break;
                
            case 'postgresql':
                // Elephant trunk movement
                const elephantTrunk = item.children.find(child => 
                    child.geometry && child.geometry.type === 'CylinderGeometry' &&
                    child.position.x > 0.2
                );
                if (elephantTrunk) {
                    elephantTrunk.rotation.z = -Math.PI / 6 + Math.sin(time * 1.5) * 0.2;
                }
                break;
        }
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.isInitialized = false;
    }
}

export default Environment3D;
