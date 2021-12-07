import numpy as np
import base64

obj_file = 'cow-nonormals.obj'

# VERTICES = np.array([0.,0.,0.,    0.,1.,0.,    1.,0.,0.], dtype=np.float32)
# INDICES = np.array([0, 1, 2], dtype=np.ushort)
VERTICES = []
INDICES = []

# HOWMANY = 3
MAX_X = 0
MAX_Y = 0
MAX_Z = 0
MIN_X = 999999
MIN_Y = 999999
MIN_Z = 999999

with open(obj_file, 'r') as f:
    for line in f.readlines():
        if line[0] == 'v':
            x = float(line.split()[1])
            y = float(line.split()[2])
            z = float(line.split()[3])
            VERTICES.extend([x, y, z])

            if x > MAX_X:
                MAX_X = x
            if y > MAX_Y:
                MAX_Y = y
            if z > MAX_Z:
                MAX_Z = z
            if x < MIN_X:
                MIN_X = x
            if y < MIN_Y:
                MIN_Y = y
            if z < MIN_Z:
                MIN_Z = z

        elif line[0] == 'f':
            x = int(line.split()[1]) - 1
            y = int(line.split()[2]) - 1
            z = int(line.split()[3]) - 1
            INDICES.extend([x, y, z])

MAX = max(INDICES)
MIN = min(INDICES)

VERTICES = np.array(VERTICES, dtype=np.float32)
INDICES = np.array(INDICES, dtype=np.int16)

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
            "count": len(VERTICES) / 3,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": len(INDICES),
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
            "uri": "data:application/octet-stream;base64," + str(B64_VERTICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_V
        },
        {
            "uri": "data:application/octet-stream;base64," + str(B64_INDICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_I
        }
    ],

    "materials": [
        {
            "name": "gold",
            "pbrMetallicRoughness": {
                "baseColorFactor": [1.000, 0.766, 0.336, 1.0],
                "metallicFactor": 0.5,
                "roughnessFactor": 0.1
            }
        }
    ],

    "meshes": [
        {
            "primitives": [{
                "mode": 4,
                "attributes": {
                    "POSITION": 0
                },
                "indices": 1,
                "material": 0
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

# print ( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes
filename = obj_file.split('.')[0] + '.gltf'
file = open(filename, 'w')
file.write(str(gltf).replace("'", '"'))  # we need double quotes instead of single quotes
file.close()
