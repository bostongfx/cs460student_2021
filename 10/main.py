import numpy as np
import base64


def obj2gltf(file_path):
  VERTICES = []
  INDICES = []
  
  MAX_X = float('-inf')
  MAX_Y = float('-inf')
  MAX_Z = float('-inf')
  MIN_X = float('inf')
  MIN_Y = float('inf')
  MIN_Z = float('inf')
  MAX = float('-inf')
  MIN = float('inf')

# VERTICES = np.array([0.,0.,0.,    0.,1.,0.,    1.,0.,0.], dtype=np.float32)
# INDICES = np.array([0, 1, 2], dtype=np.ushort)

# HOWMANY = 3
# MAX_X = 1
# MAX_Y = 1
# MAX_Z = 0
# MIN_X = 0
# MIN_Y = 0
# MIN_Z = 0
# MAX = 2
# MIN = 0


  with open(file_path, "r") as file:
    for line in file:
      tokens = line.split()
      if len(tokens) >= 4:
        if tokens[0] == 'v':
          x = float(tokens[1])
          y = float(tokens[2])
          z = float(tokens[3])
          if x > MAX_X: MAX_X = x
          if x < MIN_X: MIN_X = x
          if y > MAX_Y: MAX_Y = y
          if y < MIN_Y: MIN_Y = y
          if z > MAX_Z: MAX_Z = z
          if z < MIN_Z: MIN_Z = z
          VERTICES.append(x)
          VERTICES.append(y)
          VERTICES.append(z)
        elif tokens[0] == 'f':
          for token in tokens[1:4]:
            i = int(token)-1
            if i > MAX: MAX = i
            if i < MIN: MIN = i
            INDICES.append(i)

  HOWMANY_I = len(INDICES)
  HOWMANY_V = len(VERTICES) / 3
  
  INDICES = np.array(INDICES, dtype=np.ushort)
  VERTICES = np.array(VERTICES, dtype=np.float32)

  HOWMANYBYTES_V = VERTICES.nbytes
  HOWMANYBYTES_I = INDICES.nbytes

  B64_VERTICES = base64.b64encode(VERTICES)
  B64_INDICES = base64.b64encode(INDICES)


  gltf = {
    "asset": {
        "version": "2.0",
        "generator": "CS460 Magic Fingers"
    },

  "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5126,
            "count": HOWMANY_V,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": HOWMANY_I,
            "type": "SCALAR",
            "max": [MAX],
            "min": [MIN]
        }
    ], 

    "bufferViews": [
        {
            "buffer": 0,
            "byteOffset": 0,
            "byteLength": HOWMANYBYTES_V,
            "target": 34962
        },
        {
            "buffer": 1,
            "byteOffset": 0,
            "byteLength": HOWMANYBYTES_I,
            "target": 34963
        }
    ],
    
    "buffers": [
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_VERTICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_V
        },
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_INDICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_I
        }
    ],
  
    "meshes": [
        {
            "primitives": [{
                 "mode": 4,
                 "attributes": {
                     "POSITION": 0
                 },
                 "indices": 1
            }]
        }
    ],

    "nodes": [
        {
            "mesh": 0
        }
    ],

    "scenes": [
        {
            "nodes": [
                0
            ]
        }
    ],

    "scene": 0
    }
  
  return str(gltf).replace("'", '"')

def write_gltf(input, file_name):
    with open(file_name,'w') as f:
        f.write(input)


def main():
  shuttle_gltf = obj2gltf("shuttle.obj")
  write_gltf(shuttle_gltf, "shuttle.gltf")

  cube_gltf = obj2gltf("cube.obj")
  write_gltf(cube_gltf, "cube.gltf")

  teapot_gltf = obj2gltf("teapot.obj")
  write_gltf(teapot_gltf, "teapot.gltf")

  test_gltf = obj2gltf("test.obj")
  write_gltf(test_gltf, "test.gltf")
  return



if __name__ == "__main__":
    main()