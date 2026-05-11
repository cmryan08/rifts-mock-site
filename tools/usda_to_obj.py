import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
USDA = ROOT / "assets" / "rifts-web.usda"
OBJ = ROOT / "assets" / "rifts-web.obj"
MTL = ROOT / "assets" / "rifts-web.mtl"


def parse_float_triples(text):
    return [tuple(map(float, match)) for match in re.findall(r"\((-?\d+(?:\.\d+)?(?:e[+-]?\d+)?),\s*(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?),\s*(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\)", text, flags=re.I)]


def parse_ints(text):
    return [int(item) for item in re.findall(r"-?\d+", text)]


def parse_materials(text):
    materials = {}
    for block in re.finditer(r'def Material "([^"]+)"\s*\{(.*?)(?=\n    def Material|\n    def Mesh|\n\})', text, re.S):
        name = block.group(1)
        body = block.group(2)
        color_match = re.search(r"color3f inputs:diffuseColor = \(([^)]+)\)", body)
        roughness_match = re.search(r"float inputs:roughness = ([0-9.]+)", body)
        metallic_match = re.search(r"float inputs:metallic = ([0-9.]+)", body)
        color = (0.176471, 0.176471, 0.176471)
        if color_match:
            color = tuple(float(value.strip()) for value in color_match.group(1).split(","))
        materials[name] = {
            "color": color,
            "roughness": float(roughness_match.group(1)) if roughness_match else 0.65,
            "metallic": float(metallic_match.group(1)) if metallic_match else 0.0,
        }
    return materials


def extract_mesh_blocks(text):
    starts = [match.start() for match in re.finditer(r'\n    def Mesh "', text)]
    starts.append(text.rfind("\n}"))
    blocks = []
    for index, start in enumerate(starts[:-1]):
        blocks.append(text[start:starts[index + 1]])
    return blocks


def line_value(block, key):
    match = re.search(rf"{re.escape(key)} = \[(.*?)\]", block, re.S)
    return match.group(1) if match else ""


def mesh_name(block):
    match = re.search(r'def Mesh "([^"]+)"', block)
    return match.group(1) if match else "Mesh"


def mesh_material(block):
    match = re.search(r"rel material:binding = </Rifts_Web/([^>]+)>", block)
    return match.group(1) if match else "RiftsCharcoal"


def mesh_scale(block):
    match = re.search(r"matrix4d xformOp:transform = \( \(?([0-9.\-]+),", block)
    return float(match.group(1)) if match else 1.0


def sanitize(name):
    return re.sub(r"[^A-Za-z0-9_.-]+", "_", name)


def write_files():
    text = USDA.read_text()
    materials = parse_materials(text)

    with MTL.open("w") as mtl:
      mtl.write("# Converted from Fusion USDZ export\n")
      for name, data in materials.items():
          color = data["color"]
          metallic = data["metallic"]
          roughness = data["roughness"]
          mtl.write(f"newmtl {sanitize(name)}\n")
          mtl.write(f"Kd {color[0]:.6f} {color[1]:.6f} {color[2]:.6f}\n")
          mtl.write("Ka 0.000000 0.000000 0.000000\n")
          mtl.write(f"Ks {0.18 if metallic else 0.04:.6f} {0.18 if metallic else 0.04:.6f} {0.18 if metallic else 0.04:.6f}\n")
          mtl.write(f"Ns {max(8, (1 - roughness) * 120):.6f}\n")
          mtl.write("d 1.0\n\n")

    vertex_offset = 1
    mesh_count = 0
    face_count = 0
    vertex_count = 0

    with OBJ.open("w") as obj:
        obj.write("# Converted from Fusion USDZ export\n")
        obj.write("mtllib rifts-web.mtl\n")

        for block in extract_mesh_blocks(text):
            points = parse_float_triples(line_value(block, "point3f[] points"))
            counts = parse_ints(line_value(block, "int[] faceVertexCounts"))
            indices = parse_ints(line_value(block, "int[] faceVertexIndices"))
            if not points or not counts or not indices:
                continue

            name = sanitize(mesh_name(block))
            material = sanitize(mesh_material(block))
            scale = mesh_scale(block)
            obj.write(f"\no {name}\n")
            obj.write(f"g {name}\n")
            obj.write(f"usemtl {material}\n")

            for x, y, z in points:
                # USD is Z-up. Three.js OBJ is Y-up, so remap to keep the server naturally upright.
                obj.write(f"v {x * scale:.6f} {z * scale:.6f} {-y * scale:.6f}\n")

            cursor = 0
            for count in counts:
                face = indices[cursor:cursor + count]
                cursor += count
                if count < 3:
                    continue
                for i in range(1, count - 1):
                    a = face[0] + vertex_offset
                    b = face[i] + vertex_offset
                    c = face[i + 1] + vertex_offset
                    obj.write(f"f {a} {b} {c}\n")
                    face_count += 1

            vertex_offset += len(points)
            vertex_count += len(points)
            mesh_count += 1

    print(f"wrote {OBJ}")
    print(f"meshes={mesh_count} vertices={vertex_count} triangles={face_count}")


if __name__ == "__main__":
    write_files()
