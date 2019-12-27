"""
A simple script and library to convert files or strings from dos like
line endings with Unix like line endings.
"""

import argparse
import os


def str2unix(input_str: str) -> str:
    r"""\
    Converts the string from \r\n line endings to \n

    Parameters
    ----------
    input_str
        The string whose line endings will be converted

    Returns
    -------
        The converted string
    """
    r_str = input_str.replace("\r\n", "\n")
    return r_str


def dos2unix(source_file: str, dest_file: str):
    """\
    Coverts a file that contains Dos like line endings into Unix like

    Parameters
    ----------
    source_file
        The path to the source file to be converted
    dest_file
        The path to the converted file for output
    """
    # NOTE: Could add file existence checking and file overwriting
    # protection
    with open(source_file, "r") as reader:
        dos_content = reader.read()

    unix_content = str2unix(dos_content)

    with open(dest_file, "w") as writer:
        writer.write(unix_content)


if __name__ == "__main__":
    # Create our Argument parser and set its description
    parser = argparse.ArgumentParser(
        description="Script that converts a DOS like file to an Unix like file",
    )

    # Add the arguments:
    #   - source_file: the source file we want to convert
    #   - dest_file: the destination where the output should go

    # Note: the use of the argument type of argparse.FileType could
    # streamline some things
    parser.add_argument("source_file", help="The location of the source ")

    parser.add_argument(
        "--dest_file",
        help="Location of dest file (default: source_file appended with `_unix`",
        default=None,
    )

    # Parse the args (argparse automatically grabs the values from
    # sys.argv)
    args = parser.parse_args()

    s_file = args.source_file
    d_file = args.dest_file

    # If the destination file wasn't passed, then assume we want to
    # create a new file based on the old one
    if d_file is None:
        file_path, file_extension = os.path.splitext(s_file)
        d_file = f"{file_path}_unix{file_extension}"

    dos2unix(s_file, d_file)
