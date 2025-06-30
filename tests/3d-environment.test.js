/**
 * @jest-environment jsdom
 */

// Mock Three.js
jest.mock('three', () => {
    const mockThree = {
        Scene: jest.fn().mockImplementation(() => ({
            add: jest.fn(),
            background: null,
            fog: null
        })),
        PerspectiveCamera: jest.fn().mockImplementation(() => ({
            position: { set: jest.fn() },
            lookAt: jest.fn(),
            aspect: 1,
            updateProjectionMatrix: jest.fn()
        })),
        WebGLRenderer: jest.fn().mockImplementation(() => ({
            setSize: jest.fn(),
            setPixelRatio: jest.fn(),
            shadowMap: { enabled: false, type: null },
            render: jest.fn(),
            dispose: jest.fn()
        })),
        AmbientLight: jest.fn().mockImplementation(() => ({})),
        DirectionalLight: jest.fn().mockImplementation(() => ({
            position: { set: jest.fn() },
            castShadow: false,
            shadow: { mapSize: { width: 0, height: 0 } }
        })),
        PointLight: jest.fn().mockImplementation(() => ({
            position: { set: jest.fn() }
        })),
        PlaneGeometry: jest.fn().mockImplementation(() => ({})),
        CylinderGeometry: jest.fn().mockImplementation(() => ({})),
        SphereGeometry: jest.fn().mockImplementation(() => ({})),
        BoxGeometry: jest.fn().mockImplementation(() => ({})),
        MeshLambertMaterial: jest.fn().mockImplementation(() => ({})),
        Mesh: jest.fn().mockImplementation(() => ({
            position: { set: jest.fn() },
            rotation: { x: 0, y: 0, z: 0 },
            castShadow: false,
            receiveShadow: false,
            userData: {}
        })),
        Group: jest.fn().mockImplementation(() => ({
            add: jest.fn(),
            position: { set: jest.fn() },
            rotation: { y: 0 },
            userData: {}
        })),
        Color: jest.fn().mockImplementation(() => ({})),
        Fog: jest.fn().mockImplementation(() => ({})),
        Raycaster: jest.fn().mockImplementation(() => ({
            setFromCamera: jest.fn(),
            intersectObjects: jest.fn().mockReturnValue([])
        })),
        Vector2: jest.fn().mockImplementation(() => ({ x: 0, y: 0 })),
        PCFSoftShadowMap: 'PCFSoftShadowMap'
    };
    return { __esModule: true, ...mockThree, default: mockThree };
});

// Import the 3D environment module
import Environment3D from '../assets/js/3d-environment.js';

describe('3D Environment', () => {
    let environment3D;
    let mockCharacterData;
    let mockContainer;

    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
            <div id="3d-environment">
                <canvas id="3d-canvas"></canvas>
            </div>
            <div id="dialogue-window" class="dialogue-window hidden">
                <div class="dialogue-content">
                    <div id="lore-tab" class="tab-content active">
                        <div class="lore-content"></div>
                    </div>
                    <div id="skills-tab" class="tab-content">
                        <div class="skills-content"></div>
                    </div>
                </div>
            </div>
            <div id="equipment-tooltip" class="equipment-tooltip hidden">
                <div class="tooltip-content">
                    <div class="tooltip-header">
                        <span class="tooltip-icon"></span>
                        <span class="tooltip-name"></span>
                    </div>
                    <div class="tooltip-description"></div>
                </div>
            </div>
        `;

        mockContainer = document.getElementById('3d-environment');
        // Mock clientWidth and clientHeight using Object.defineProperty
        Object.defineProperty(mockContainer, 'clientWidth', { value: 800, configurable: true });
        Object.defineProperty(mockContainer, 'clientHeight', { value: 600, configurable: true });

        mockCharacterData = {
            name: 'Test Character',
            class: 'Test Class',
            title: 'Test Title',
            stats: {
                health: 85,
                strength: 70
            },
            skills: {
                'JavaScript': 5,
                'Python': 4
            },
            equipment: [
                { name: 'Python', icon: '🐍', description: 'Primary programming language' },
                { name: 'JavaScript', icon: '⚡', description: 'Web development powerhouse' }
            ],
            lore: 'Test character lore'
        };

        // Mock getBoundingClientRect
        mockContainer.getBoundingClientRect = jest.fn().mockReturnValue({
            left: 0,
            top: 0,
            width: 800,
            height: 600
        });
    });

    afterEach(() => {
        document.body.innerHTML = '';
        if (environment3D) {
            environment3D.destroy();
        }
    });

    describe('Initialization', () => {
        test('should initialize 3D environment with valid container', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            expect(environment3D).toBeDefined();
            expect(environment3D.isInitialized).toBe(true);
        });

        test('should handle missing container gracefully', () => {
            expect(() => {
                environment3D = new Environment3D('non-existent', mockCharacterData);
            }).toThrow('3D Environment container not found');
        });

        test('should setup scene with correct properties', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            expect(environment3D.scene).toBeDefined();
        });

        test('should setup camera with correct properties', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            expect(environment3D.camera).toBeDefined();
        });

        test('should setup renderer with correct properties', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            expect(environment3D.renderer).toBeDefined();
        });
    });

    describe('Character Creation', () => {
        test('should create character with correct components', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            expect(environment3D.character).toBeDefined();
            expect(environment3D.character.userData.type).toBe('character');
        });

        test('should position character at origin', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            expect(environment3D.character.position.set).toHaveBeenCalledWith(0, 0, 0);
        });
    });

    describe('Equipment Creation', () => {
        test('should create equipment items from character data', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            expect(environment3D.equipment.length).toBe(2);
        });

        test('should assign correct user data to equipment', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            environment3D.equipment.forEach(equipment => {
                expect(equipment.userData.type).toBe('equipment');
                expect(equipment.userData.item).toBeDefined();
            });
        });

        test('should assign correct colors to equipment', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            // Test that getEquipmentColor method works
            const pythonColor = environment3D.getEquipmentColor('Python');
            const jsColor = environment3D.getEquipmentColor('JavaScript');
            expect(pythonColor).toBe(0x3776ab);
            expect(jsColor).toBe(0xf7df1e);
        });
    });

    describe('Interaction Handling', () => {
        test('should handle mouse move events', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: 400,
                clientY: 300
            });
            
            // Mock raycaster intersection
            environment3D.raycaster.intersectObjects = jest.fn().mockReturnValue([]);
            
            mockContainer.dispatchEvent(mouseEvent);
            expect(environment3D.raycaster.setFromCamera).toHaveBeenCalled();
        });

        test('should handle mouse click events', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            const clickEvent = new MouseEvent('click', {
                clientX: 400,
                clientY: 300
            });
            
            // Mock raycaster intersection with character
            environment3D.raycaster.intersectObjects = jest.fn().mockReturnValue([
                { object: { userData: { type: 'character' } } }
            ]);
            
            mockContainer.dispatchEvent(clickEvent);
            expect(environment3D.raycaster.setFromCamera).toHaveBeenCalled();
        });

        test('should open dialogue window when character is clicked', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            const dialogueWindow = document.getElementById('dialogue-window');
            
            // Mock raycaster intersection with character
            environment3D.raycaster.intersectObjects = jest.fn().mockReturnValue([
                { object: { userData: { type: 'character' } } }
            ]);
            
            environment3D.openDialogueWindow();
            expect(dialogueWindow.classList.contains('hidden')).toBe(false);
        });

        test('should show equipment tooltip on hover', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            const tooltip = document.getElementById('equipment-tooltip');
            
            // Mock raycaster intersection with equipment
            environment3D.raycaster.intersectObjects = jest.fn().mockReturnValue([
                { 
                    object: { 
                        userData: { 
                            type: 'equipment',
                            item: { name: 'Python', icon: '🐍', description: 'Test' }
                        } 
                    } 
                }
            ]);
            
            environment3D.checkEquipmentHover();
            expect(tooltip.classList.contains('hidden')).toBe(false);
        });

        test('should hide equipment tooltip when not hovering', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            const tooltip = document.getElementById('equipment-tooltip');
            
            // Mock raycaster intersection with nothing
            environment3D.raycaster.intersectObjects = jest.fn().mockReturnValue([]);
            
            environment3D.checkEquipmentHover();
            expect(tooltip.classList.contains('hidden')).toBe(true);
        });
    });

    describe('Dialogue System', () => {
        test('should populate lore content in dialogue', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            environment3D.populateDialogueContent();
            
            const loreContent = document.querySelector('#lore-tab .lore-content');
            expect(loreContent.innerHTML).toContain(mockCharacterData.lore);
        });

        test('should populate skills content in dialogue', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            environment3D.populateDialogueContent();
            
            const skillsContent = document.querySelector('#skills-tab .skills-content');
            expect(skillsContent.innerHTML).toContain('JavaScript');
            expect(skillsContent.innerHTML).toContain('Python');
        });

        test('should generate correct star ratings', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            
            const fiveStars = environment3D.generateStars(5);
            const threeStars = environment3D.generateStars(3);
            
            expect(fiveStars).toContain('filled');
            expect(threeStars).toContain('empty');
            expect((fiveStars.match(/★/g) || []).length).toBe(5);
        });
    });

    describe('Animation', () => {
        test('should animate character rotation', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            const initialRotation = environment3D.character.rotation.y;
            
            // Mock requestAnimationFrame
            const mockRAF = jest.fn();
            global.requestAnimationFrame = mockRAF;
            
            environment3D.animate();
            expect(mockRAF).toHaveBeenCalled();
        });

        test('should animate equipment rotation', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            const initialRotation = environment3D.equipment[0].rotation.y;
            
            // Mock requestAnimationFrame
            const mockRAF = jest.fn();
            global.requestAnimationFrame = mockRAF;
            
            environment3D.animate();
            expect(mockRAF).toHaveBeenCalled();
        });
    });

    describe('Window Resize', () => {
        test('should handle window resize', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            
            // Mock window resize
            const resizeEvent = new Event('resize');
            window.dispatchEvent(resizeEvent);
            
            expect(environment3D.camera.aspect).toBe(800 / 600);
            expect(environment3D.camera.updateProjectionMatrix).toHaveBeenCalled();
        });
    });

    describe('Cleanup', () => {
        test('should destroy environment properly', () => {
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            environment3D.destroy();
            
            expect(environment3D.isInitialized).toBe(false);
            expect(environment3D.renderer.dispose).toHaveBeenCalled();
        });
    });

    describe('Error Handling', () => {
        test('should handle WebGL context errors gracefully', () => {
            // Mock WebGL context failure
            const mockCanvas = {
                getContext: jest.fn().mockReturnValue(null)
            };
            jest.spyOn(document, 'createElement').mockReturnValue(mockCanvas);
            
            console.error = jest.fn();
            environment3D = new Environment3D('3d-environment', mockCharacterData);
            
            // Should still initialize without crashing
            expect(environment3D).toBeDefined();
        });
    });
}); 