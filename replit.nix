{ pkgs }: {
  deps = [
    pkgs.nodejs
    pkgs.python39
    pkgs.ffmpeg
    pkgs.pip
    pkgs.cacert
  ];
}
