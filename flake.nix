
{
  description = "Dev shell for Salaar's communication game";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    idx = {
      url = "path:./.idx";
      flake = false;
    };
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, idx, flake-utils }@inputs:
    flake-utils.lib.eachDefaultSystem (system:
      let
	inherit idx;
        pkgs = nixpkgs.legacyPackages.${system};
        dev-dot-nix = import "${idx}/dev.nix" { inherit pkgs; };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "saga";
	  packages = dev-dot-nix.packages;
	  shellHook = ''
	    echo Entering Dev Shell
	  '';
	};
      });
}
