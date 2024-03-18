# OSS 117 random quotes CLI

This is a simple CLI that displays random quotes from the movie OSS 117 using the https://oss117quotes.xyz/ API.

## Requirements

- Node.js 20 or higher

## Getting Started

### Install from NPM repository

- install
  ```bash
    npm install -g @alekart/oss-117
  ```
- link the binary
  ```bash
    npm link @alekart/oss-117
  ```
- Run the CLI
  ```bash
    oss
  ```

### Install from git repository

1. Clone the repository

  ```bash
    git clone https://github.com/alekart/oss-117.git oss
  ```

2. Install the dependencies

  ```bash
  cd oss
  npm install
  ```

3. Run the CLI

- Run the CLI via path to file (path is relative to the root of the project)
   ```bash
    ./src/oss.js
   ```
- Or add the binary to your PATH
  - Link the binary
     ```bash
       npm link
    ```
  - and then run the cli with global command from anywhere in terminal
    ```bash
      oss
    ```

## Usage

By default, the CLI will display a random quote from the movie OSS 117, but you can also use the following arguments.
The arguments can be combined to get a more specific results.

### Options

- `--character` | `-c` - provide a character name to get a quote from a specific character
- `--number` | `-n` - provide a number to get multiple quotes
- `--keyword` | `-k` - provide a specific word to get a quote containing that word (case-insensitive).

### Arguments

- `--list` | `-l` - display list of available characters to use as --character option
- `--help` | `-h` - display the help message (usage and options)
- `--version` - display CLI version

### Example

```bash
oss --character hubert -n 3
```

```bash
oss --keyword=blanquette --number=3
```
