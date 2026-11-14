"""Register the original Manakkal photo to the finished mural photograph.

The facade and roof are different planes, so a horizontal CSS stretch cannot
align both. Register the window frames on the facade and roof corners separately,
then blend the coordinate maps around the eaves. No scene content is generated.
Run from the repository root with Python and Pillow available.
"""

from pathlib import Path

from PIL import Image


IMAGES = Path("artifacts/kirukans/public/images")

# Corresponding window-frame corners: original photo, finished mural photo.
WINDOWS = [
    ((218, 216), (121, 231)), ((323, 215), (254, 231)),
    ((323, 330), (254, 375)), ((219, 331), (121, 375)),
    ((357, 215), (300, 232)), ((435, 214), (401, 232)),
    ((435, 324), (401, 378)), ((357, 325), (300, 377)),
    ((710, 207), (773, 235)), ((805, 206), (909, 236)),
    ((805, 311), (909, 383)), ((710, 312), (773, 382)),
    ((840, 206), (954, 237)), ((905, 205), (1045, 238)),
    ((906, 308), (1045, 385)), ((840, 309), (954, 384)),
]
ROOF = [
    ((464, 72), (495, 62)), ((628, 72), (703, 65)),
    ((94, 201), (0, 204)), ((1038, 190), (1206, 205)),
]


def solve(matrix, values):
    augmented = [list(row) + [value] for row, value in zip(matrix, values)]
    n = len(values)
    for col in range(n):
        pivot = max(range(col, n), key=lambda row: abs(augmented[row][col]))
        augmented[col], augmented[pivot] = augmented[pivot], augmented[col]
        divisor = augmented[col][col]
        if abs(divisor) < 1e-12:
            raise ValueError("Landmarks do not define a usable image transform")
        augmented[col] = [value / divisor for value in augmented[col]]
        for row in range(n):
            if row == col:
                continue
            factor = augmented[row][col]
            augmented[row] = [
                a - factor * b for a, b in zip(augmented[row], augmented[col])
            ]
    return [row[-1] for row in augmented]


def inverse_homography(matches):
    rows, values = [], []
    for (u, v), (x, y) in matches:
        rows.extend([
            [x, y, 1, 0, 0, 0, -u * x, -u * y],
            [0, 0, 0, x, y, 1, -v * x, -v * y],
        ])
        values.extend([u, v])
    normal = [
        [sum(row[i] * row[j] for row in rows) for j in range(8)]
        for i in range(8)
    ]
    target = [sum(row[i] * val for row, val in zip(rows, values)) for i in range(8)]
    return solve(normal, target)


def project(coefficients, x, y):
    a, b, c, d, e, f, g, h = coefficients
    denominator = g * x + h * y + 1
    return ((a * x + b * y + c) / denominator,
            (d * x + e * y + f) / denominator)


def main():
    original = Image.open(IMAGES / "manakkal-wall-before.webp").convert("RGB")
    facade = inverse_homography(WINDOWS)
    roof = inverse_homography(ROOF)

    def source_point(x, y):
        top = project(roof, x, y)
        bottom = project(facade, x, y)
        mix = max(0, min(1, (y - 175) / 50))
        mix = mix * mix * (3 - 2 * mix)
        return tuple(a * (1 - mix) + b * mix for a, b in zip(top, bottom))

    width, height = original.size
    mesh = []
    for top in range(0, height, 16):
        for left in range(0, width, 16):
            right, bottom = min(left + 16, width), min(top + 16, height)
            quad = [
                coordinate
                for point in [(left, top), (left, bottom), (right, bottom), (right, top)]
                for coordinate in source_point(*point)
            ]
            mesh.append(((left, top, right, bottom), quad))
    aligned = original.transform(
        original.size, Image.Transform.MESH, mesh, Image.Resampling.BICUBIC
    )
    output = IMAGES / "manakkal-wall-before-aligned.webp"
    aligned.save(output, "WEBP", quality=90, method=6)
    print(f"Saved registered original photo: {output}")


if __name__ == "__main__":
    main()
