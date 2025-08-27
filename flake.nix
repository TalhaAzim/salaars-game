{
  description = "Dev shell for Salaar's communication game";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }@inputs:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
	idx = import ./.idx/dev.nix pkgs;
      in
      {
        devShells.default = pkgs.mkShell {
          name = "saga";
	  packages = idx.packages;
	  shelHook = "";
	};
      });
}
