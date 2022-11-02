//go:build !production

package environment

import "os"

func init() {
	// Database Related

	os.Setenv("DATABASE_HOST", "localhost")
	os.Setenv("DATABASE_NAME", "api")
	os.Setenv("DATABASE_USER", "root")
	os.Setenv("DATABASE_PASSWORD", "root")

	// Github Related
	os.Setenv("GITHUB_API_SCHEMA_NAME", "api_keys")
	os.Setenv("GITHUB_API_ORIGIN", "ghub:1")
	os.Setenv("GITHUB_USER_NAME", "ericodesu")
}
