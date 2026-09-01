from collections import defaultdict
from pathlib import Path


def get_file_id(file_path: Path) -> str | None:
    _, separator, file_id = file_path.stem.partition("__")
    return file_id if separator and file_id else None


def find_duplicate_ids(folder: Path) -> dict[str, list[Path]]:
    files_by_id: dict[str, list[Path]] = defaultdict(list)

    for file_path in folder.iterdir():
        if not file_path.is_file():
            continue

        file_id = get_file_id(file_path)
        if file_id is not None:
            files_by_id[file_id].append(file_path)

    return {
        file_id: files
        for file_id, files in files_by_id.items()
        if len(files) > 1
    }


def main() -> None:
    folder_input = input("Enter the folder path to check: ").strip()
    if len(folder_input) >= 2 and folder_input[0] == folder_input[-1] and folder_input[0] in "\"'":
        folder_input = folder_input[1:-1]
    folder = Path(folder_input).expanduser()

    if not folder.is_dir():
        print("The specified folder does not exist or is not a directory.")
        return

    duplicate_ids = find_duplicate_ids(folder)

    if not duplicate_ids:
        print("No duplicate IDs found.")
        return

    print("Duplicate IDs found:")
    for file_id, files in sorted(duplicate_ids.items()):
        print(f"\nID: {file_id}")
        for file_path in sorted(files):
            print(f"  - {file_path.name}")


if __name__ == "__main__":
    main()