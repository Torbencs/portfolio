window.addEventListener('DOMContentLoaded', function(){

    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');
    
    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

  
    // createScene function that creates and return the scene
    var createSceneInteractive = function () {


    
        // Scene and Physics
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
        
    
            
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(1.8, 2.12, 0.8));
        
    
        // Camera controls
        camera.attachControl(canvas, true);
    
        //Lights
        // Old - var light_spot = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-2, 20, 15), new BABYLON.Vector3(6, -9 ,-9), Math.PI, 20, scene);
        var light_spot_l = new BABYLON.SpotLight("spotLightL", new BABYLON.Vector3(2, 3, 3.4), new BABYLON.Vector3(-2, -1, -1), Math.PI, 5, scene);

        var light_spot_r = new BABYLON.SpotLight("spotLightR", new BABYLON.Vector3(-4, 6, 1.2), new BABYLON.Vector3(1, -1,-1), Math.PI, 5, scene);       

        var light_hemi = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(20, 20, 0), scene);
        
        light_spot_r.intensity = 0.9;
        light_spot_l.intensity = 0.7
      
        light_hemi.intensity = .6;
   
        //Light visual helpers
        var lightSphere1 = BABYLON.Mesh.CreateSphere("sphere", 16, 0.3, scene);
        lightSphere1.position = light_spot_l.position;
        lightSphere1.material = new BABYLON.StandardMaterial("light2", scene);
        lightSphere1.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

        var lightSphere2 = BABYLON.Mesh.CreateSphere("sphere", 16, 0.3, scene);
        lightSphere2.position = light_spot_r.position;
        lightSphere2.material = new BABYLON.StandardMaterial("light2", scene);
        lightSphere2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    
        //Shadows
        shadowGenerator = new BABYLON.ShadowGenerator(1024, light_spot_l);
        //Switch to test different shadow configs
        let shadow_options = 2;
        switch (shadow_options) {
            case 1:
                shadowGenerator.bias = 0.035;
                shadowGenerator.usePoissonSampling = true;
                shadowGenerator.useBlurExponentialShadowMap = true;
                shadowGenerator.frustumEdgeFalloff = 0;
                //shadowGenerator.darkness = 0.3;
                break;
            case 2:
                shadowGenerator.bias = 0.001;
                shadowGenerator.usePoissonSampling = true;
                shadowGenerator.useBlurExponentialShadowMap = true;
                shadowGenerator.frustumEdgeFalloff = 3;
                //shadowGenerator.darkness = 0.3;
                break;
    
        };

        
    
        //Add imported model
        BABYLON.SceneLoader.ImportMesh("", "", "models/interactive.babylon", scene, function (mesh) {
                
            
                hi_mesh = mesh[0];
    
                hi_mesh_mat = new BABYLON.StandardMaterial("hi_mesh_mat", scene);
                hi_mesh_mat.diffuseColor = new BABYLON.Color3.FromHexString("#374051");
                hi_mesh.specularColor = new BABYLON.Color3.FromHexString("#000000");
                hi_mesh.material = hi_mesh_mat;
                hi_mesh.receiveShadows = true;
                //camera.setTarget(hi_mesh.position);



                hi_plane_mesh = mesh[1];
                
                hi_plane_mesh.material = new BABYLON.ShadowOnlyMaterial('shadowOnlyMat', scene);
                hi_plane_mesh.receiveShadows = true;
                
              
                
                //Add shadows to imported model
                shadowGenerator.addShadowCaster(hi_mesh);
         

              

                let m;
                for (m=0; m < mesh.length; m++) {
                    console.log(mesh[m].id);
                };

        }); 
        
       
    
        //Sphere model positioning
        
        
        //var pipeline = new BABYLON.DefaultRenderingPipeline("", true, scene);
        //pipeline.samples = 3;
        
    
        //var kernel = 4;	
        //var postProcess0 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), kernel, 1.0, camera);
        
        return scene;
    
        };
    
    //Call the createScene function
    var sceneInteractive = createSceneInteractive();
    
    //Run the render loop
    engine.runRenderLoop(function(){
        sceneInteractive.render();
    });
    //Mobile quality
    //engine.setHardwareScalingLevel(0.5)

    
    
    //Add the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
    
    });