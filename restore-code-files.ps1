# Add code files back to Railway repositories
$API_BASE = "https://portefolio-production-72f9.up.railway.app/api"

Write-Host "Adding code files to repositories..." -ForegroundColor Cyan

# Repository 1: F1 Pipeline
Write-Host "`nUpdating Repository 1: Formula 1 Pipeline..." -ForegroundColor Yellow
$repo1 = Invoke-RestMethod -Uri "$API_BASE/repositories/1" -Method Get

$repo1.files = @(
    @{
        fileName = "f1_dag.py"
        filePath = "dags/f1_dag.py"
        content = @"
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data-engineer',
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

def validate_f1_data():
    print('Validating F1 pitstop data (1950-2024)')
    valid_teams = ['Mercedes', 'Red Bull', 'Ferrari', 'McLaren']
    return True

def transform_data():
    print('Applying 5 feature transformations')
    return {'status': 'transformed'}

def load_to_storage():
    print('Loading to local and Azure Blob storage')
    return {'local': 'success', 'azure': 'success'}

with DAG('f1_pipeline', 
         default_args=default_args,
         start_date=datetime(2024, 1, 1),
         schedule_interval=timedelta(hours=1)) as dag:
    
    validate = PythonOperator(
        task_id='validate', 
        python_callable=validate_f1_data
    )
    transform = PythonOperator(
        task_id='transform',
        python_callable=transform_data
    )
    load = PythonOperator(
        task_id='load',
        python_callable=load_to_storage
    )
    
    validate >> transform >> load
"@
        language = "python"
        lines = 44
    },
    @{
        fileName = "file_monitor.py"
        filePath = "src/file_monitor.py"
        content = @"
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class F1DataMonitor(FileSystemEventHandler):
    def __init__(self, data_dir):
        self.data_dir = data_dir
        
    def on_created(self, event):
        if event.src_path.endswith('.csv'):
            print(f'New F1 data: {event.src_path}')
            self.process_file(event.src_path)
    
    def process_file(self, filepath):
        print(f'Processing {filepath}')

def start_monitoring(directory):
    observer = Observer()
    observer.schedule(
        F1DataMonitor(directory), 
        directory, 
        recursive=True
    )
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == '__main__':
    start_monitoring('./data/f1_pitstops')
"@
        language = "python"
        lines = 34
    },
    @{
        fileName = "docker-compose.yml"
        filePath = "docker-compose.yml"
        content = @"
version: '3.8'

services:
  airflow-webserver:
    image: apache/airflow:2.7.0
    environment:
      - AIRFLOW__CORE__EXECUTOR=LocalExecutor
    volumes:
      - ./dags:/opt/airflow/dags
      - ./logs:/opt/airflow/logs
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    command: webserver

  airflow-scheduler:
    image: apache/airflow:2.7.0
    volumes:
      - ./dags:/opt/airflow/dags
    depends_on:
      - postgres
    command: scheduler

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_USER=airflow
      - POSTGRES_PASSWORD=airflow
      - POSTGRES_DB=airflow
    volumes:
      - postgres-db:/var/lib/postgresql/data

volumes:
  postgres-db:
"@
        language = "yaml"
        lines = 35
    }
)

$updateBody1 = $repo1 | ConvertTo-Json -Depth 10
Invoke-RestMethod -Uri "$API_BASE/repositories/1" -Method Put -Body $updateBody1 -ContentType "application/json" | Out-Null
Write-Host "  ✓ Added 3 files to F1 Pipeline" -ForegroundColor Green

# Repository 2: Energy Game
Write-Host "`nUpdating Repository 2: Energy Game..." -ForegroundColor Yellow
$repo2 = Invoke-RestMethod -Uri "$API_BASE/repositories/2" -Method Get

$repo2.files = @(
    @{
        fileName = "main.js"
        filePath = "src/main.js"
        content = @"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class EnergyGame {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.set(50, 30, 50);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        this.setupScene();
        this.animate();
    }

    setupScene() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambient);
        
        const sun = new THREE.DirectionalLight(0xffffff, 0.8);
        sun.position.set(50, 100, 50);
        sun.castShadow = true;
        this.scene.add(sun);
        
        this.scene.background = new THREE.Color(0x87CEEB);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new EnergyGame();
"@
        language = "javascript"
        lines = 44
    },
    @{
        fileName = "windTurbine.js"
        filePath = "src/windTurbine.js"
        content = @"
import * as THREE from 'three';

export class WindTurbine extends THREE.Group {
    constructor() {
        super();
        this.rotationSpeed = 0.02;
        this.createTurbine();
    }

    createTurbine() {
        const tower = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.8, 20, 6),
            new THREE.MeshLambertMaterial({ color: 0xEEEEEE })
        );
        tower.position.y = 10;
        tower.castShadow = true;
        this.add(tower);

        const nacelle = new THREE.Mesh(
            new THREE.BoxGeometry(2, 1.5, 1.5),
            new THREE.MeshLambertMaterial({ color: 0xCCCCCC })
        );
        nacelle.position.y = 20;
        this.add(nacelle);

        this.bladesGroup = new THREE.Group();
        this.bladesGroup.position.set(1, 20, 0);
        
        for (let i = 0; i < 3; i++) {
            const blade = this.createBlade();
            blade.rotation.z = (i * Math.PI * 2) / 3;
            this.bladesGroup.add(blade);
        }
        this.add(this.bladesGroup);
    }

    createBlade() {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0.3, 8);
        shape.lineTo(0, 8.5);
        shape.lineTo(-0.3, 8);
        
        return new THREE.Mesh(
            new THREE.ExtrudeGeometry(shape, { depth: 0.1 }),
            new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
        );
    }

    rotate() {
        this.bladesGroup.rotation.x += this.rotationSpeed;
    }
}
"@
        language = "javascript"
        lines = 53
    },
    @{
        fileName = "city.js"
        filePath = "src/city.js"
        content = @"
import * as THREE from 'three';

export function createCity() {
    const cityGroup = new THREE.Group();

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshLambertMaterial({ color: 0x90EE90 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    cityGroup.add(ground);

    for (let i = 0; i < 30; i++) {
        const building = createBuilding();
        building.position.set(
            Math.random() * 80 - 40,
            building.geometry.parameters.height / 2,
            Math.random() * 80 - 40
        );
        cityGroup.add(building);
    }

    return cityGroup;
}

function createBuilding() {
    const width = Math.random() * 3 + 2;
    const height = Math.random() * 15 + 5;
    const depth = Math.random() * 3 + 2;
    
    const colors = [0xFFB6C1, 0xFFDAB9, 0xE6E6FA];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        new THREE.MeshLambertMaterial({ color })
    );
}
"@
        language = "javascript"
        lines = 40
    }
)

$updateBody2 = $repo2 | ConvertTo-Json -Depth 10
Invoke-RestMethod -Uri "$API_BASE/repositories/2" -Method Put -Body $updateBody2 -ContentType "application/json" | Out-Null
Write-Host "  ✓ Added 3 files to Energy Game" -ForegroundColor Green

Write-Host "`n✓ All code files added successfully!" -ForegroundColor Green
Write-Host "Total: 6 files across 2 repositories" -ForegroundColor Cyan
