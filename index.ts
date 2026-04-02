/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ThreeJSOverlayView } from "@googlemaps/three";

let map: google.maps.Map;

const mapOptions = {
  tilt: 0,
  heading: 0,
  zoom: 18,
  center: { lat: 35.3375, lng: 139.4870 },
  mapId: "15431d2b469f209e",
  // disable interactions due to animation loop and moveCamera
  disableDefaultUI: true,
  gestureHandling: "none",
  keyboardShortcuts: false,
};

function initMap(): void {
  const mapDiv = document.getElementById("map") as HTMLElement;

  map = new google.maps.Map(mapDiv, mapOptions);

  const scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);

  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);

  directionalLight.position.set(0, 10, 50);
  scene.add(directionalLight);

    const starShape = new THREE.Shape();
  for (let i = 0; i < 5; i++) {
    const outer = (i * Math.PI * 2) / 5 - Math.PI / 2;
    const inner = outer + Math.PI / 5;
    if (i === 0) starShape.moveTo(Math.cos(outer) * 30, Math.sin(outer) * 30);
    else starShape.lineTo(Math.cos(outer) * 30, Math.sin(outer) * 30);
    starShape.lineTo(Math.cos(inner) * 12, Math.sin(inner) * 12);
  }
  starShape.closePath();
  const extrudeSettings = { depth: 8, bevelEnabled: false };
  const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  let { tilt, heading, zoom } = mapOptions;

  const animate = () => {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    if (tilt < 67.5) {
      tilt += 0.5;
    } else if (heading <= 360) {
      heading += 0.2;
      zoom -= 0.0005;
    } else {
      return;
    }

    map.moveCamera({ tilt, heading, zoom });
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  new ThreeJSOverlayView({
    map,
    scene,
    anchor: { ...mapOptions.center, altitude: 100 },
    THREE,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export { initMap };
