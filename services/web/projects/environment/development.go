//go:build !production

package environment

import "os"

func init() {
	// Database Related

	os.Setenv("DATABASE_HOST", "")
	os.Setenv("DATABASE_NAME", "")
	os.Setenv("DATABASE_USER", "")
	os.Setenv("DATABASE_PASSWORD", "")

	// Github Related
	os.Setenv("GITHUB_API_SCHEMA_NAME", "")
	os.Setenv("GITHUB_API_ORIGIN", "")
	os.Setenv("GITHUB_USER_NAME", "")
}
