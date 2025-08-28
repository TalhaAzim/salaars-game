
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
        idxCfg = import (idx + /dev.nix) { inherit pkgs; };
	reserved = [ "name" "pname" "version" "src" "buildInputs" "buildPhase" "installPhase" "builder" "shellHook" "inputsFrom" ];
	idxEnv = pkgs.lib.filterAttrs (n: _: !(pkgs.lib.elem n reserved)) (pkgs.lib.mapAttrs (_: v: builtins.toString v) (idxCfg.env or {}));
	mkShell = (idxEnv: shellInputs: pkgs.mkShellNoCC (idxEnv // shellInputs)) idxEnv;
      in
      {
        devShells.default = mkShell {
          name = "saga";
	  packages = idxCfg.packages or [];
	  shellHook = ''
	    echo Entering Dev Shell
	  '';
	};
      });
}
