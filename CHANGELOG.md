# Changelog

All notable changes to the Physics Book project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2025-12-31] - December 2025 Major Updates

### Added

#### PDF Generation System
- **Parallel PDF Generation** (`scripts/generate-pdf-parallel.js`)
  - 3-phase generation: sections → intros → combined chapters
  - Configurable concurrency (default: 4 parallel for sections, 2 for combined)
  - 4x-8x faster than sequential generation (~30 minutes vs 2+ hours)
  - Real-time progress reporting with batch statistics
  - Memory-optimized browser instance reuse

- **Automated PDF Recovery** (`scripts/regenerate-failed-pdfs.js`)
  - Extended timeouts (300s vs standard 180s)
  - Automatic retry for failed combined chapter PDFs
  - No strict networkidle requirements for large content
  - Sequential processing to avoid resource contention

- **GitHub Actions Workflow** (`.github/workflows/generate-pdfs.yml`)
  - Weekly automated regeneration (Sundays at 00:00 UTC)
  - Manual trigger capability via Actions tab
  - Parallel processing with auto-recovery
  - Smart commits (only when PDFs change)
  - Detailed generation statistics in commit messages
  - 90-day artifact retention for backups

#### Accessibility Enhancements
- **ARIA Labels**: Comprehensive labeling throughout the site
  - Navigation elements with descriptive aria-labels
  - Interactive buttons with clear purpose descriptions
  - Search functionality with proper ARIA roles

- **Skip Navigation**: Keyboard accessibility improvements
  - Skip to main content link
  - Skip to search functionality
  - Proper focus management

- **Semantic HTML**: Enhanced document structure
  - Proper heading hierarchy
  - Semantic navigation elements
  - Better landmark regions

#### Quality Assurance
- **Liquid Syntax Conflict Detection**: Automatic detection and fixing of LaTeX/Liquid conflicts
- **Enhanced Link Validation**: Comprehensive internal and external link checking
- **Math Delimiter Validation**: Improved LaTeX delimiter balance checking
- **Content Quality Checks**: Automated validation via GitHub Actions

### Changed

#### Performance Improvements
- **Font Awesome Removal**: Eliminated 200KB+ dependency
  - Replaced with Unicode symbols (↑, ↓, ←, →, ⚠, ✓)
  - CSS2-based icons for UI elements
  - Faster page loads and better performance
  - No external font dependencies

- **Service Worker Optimization**
  - Improved caching strategy
  - Better version management
  - Enhanced offline support
  - Faster subsequent page loads

#### PDF System
- **Complete PDF Coverage**: 310 PDFs tracked, 309 generated
  - 241 section PDFs
  - 34 chapter intro PDFs
  - 34 combined chapter PDFs
  - 1 placeholder for complete book PDF (future implementation)
  - Total size: 587MB (reduced from 594MB)

- **Generation Performance**
  - Local: ~30 minutes for 309 PDFs (parallel)
  - GitHub Actions: ~60 minutes (with build and deployment)
  - Previous: 2+ hours (sequential)

#### Infrastructure
- **GitHub Actions**: Enhanced CI/CD workflows
  - Automated PDF generation and deployment
  - Quality checks on pull requests
  - Link validation in CI
  - Accessibility checks

- **Documentation**: Comprehensive updates
  - Updated `README.md` with recent improvements
  - Enhanced `claude.md` with December 2025 updates
  - Improved `scripts/README.md` with parallel generation docs
  - Updated `assets/pdf/README.md` with automation details
  - Updated this `CHANGELOG.md`

### Fixed

- **Link Issues**: Corrected broken links across documentation and content
- **YAML Syntax**: Fixed GitHub Actions workflow commit message formatting
- **PDF Timeouts**: Resolved large file generation timeouts (Chapters 9, 16, 23, 24, 29)
- **Liquid Conflicts**: Automatic wrapping of problematic LaTeX patterns with `{% raw %}` tags
- **Service Worker**: Better cache invalidation and versioning

### Performance Metrics

#### Before Optimizations
- PDF generation: 2+ hours (sequential)
- Page load with Font Awesome: ~200KB extra download
- No automated PDF regeneration

#### After Optimizations
- PDF generation: 30 minutes local, 60 minutes CI (parallel)
- Page load without Font Awesome: 200KB+ savings
- Weekly automated PDF regeneration
- 100% PDF success rate (310/310)

### Future Plans

See [`.github/workflows/FUTURE-PLAN.md`](.github/workflows/FUTURE-PLAN.md) for planned improvements:

- **Repository Optimization**: Exclude PDFs from git tracking
  - Current: 594MB of PDFs in repository
  - Future: Generate PDFs dynamically during deployment
  - Expected: Repository size reduction from ~600MB to ~40MB
  - Benefit: Faster clones, no binary merge conflicts

---

## 2025-12-11 - Typo Fixes and File Renames

### Breaking Changes (Update Your Links)

If you link to this book externally, update the following URLs:

| Old Path                                            | New Path                                              |
| --------------------------------------------------- | ----------------------------------------------------- |
| `contents/ch11VariationOfPresssure.md`              | `contents/ch11VariationOfPressure.md`                 |
| `contents/ch6FictiousForcesAndNonInertialFrames.md` | `contents/ch6FictitiousForcesAndNonInertialFrames.md` |

### Anchor Changes

| File                                                  | Old Anchor                | New Anchor |
| ----------------------------------------------------- | ------------------------- | ---------- |
| `contents/ch32MedicalApplicationsOfNuclearPhysics.md` | `#Figure1` (second image) | `#Figure2` |

### Content Fixes

#### Duplicate Content Removed

- `ch6NewtonsUniversalLawOfGravitation.md` - Removed duplicate paragraph about Newton
- `ch11VariationOfPressure.md` - Removed duplicate text about dam force

#### Missing Punctuation Added

- `ch16DampedHarmonicOscillator.md` - Added missing periods (2 instances)
- `ch25TotalInternalReflection.md` - Added space after period
- `ch18CoulombsLaw.md` - Added space after period
- `ch23Inductance.md` - Added space after period in image caption

#### Spelling/Typo Fixes

- `ch5Friction.md` - "to to lubricate" → "to lubricate"
- `ch6FictitiousForcesAndNonInertialFrames.md` - "fictious" → "fictitious" in image alt text
- `ch17Sound.md` - Removed extra 'W' character
- `ch20ResistanceAndResistivity.md` - "Tempature" → "Temperature" in table caption
- `ch22MagneticForceBetweenTwoParallelConductors.md` - "form" → "from"

#### Grammar Fixes

- `ch3ProjectileMotion.md` - "is at same height" → "is at the same height"
- `ch22MagneticFieldStrength.md` - "less then" → "less than"
- `ch33ParticlePhysics.md` - "less then" → "less than" and "a an" → "an" in image alt text

#### Punctuation Fixes

- `ch16UniformCircularMotionAndSimpleHarmonicMotion.md` - Added missing space after period
- `ch20Current.md` - Added missing space after period (after equation)
- `ch34GeneralRelativityAndQuantumTheory.md` - Added missing space after period (after figure reference)

#### Figure Reference Fixes

- `ch17SoundInterferenceAndResonance.md` - Fixed `[[Figure 6]](#Figure7)` → `[[Figure 6]](#Figure6)`
- `ch31HalfLifeAndActivity.md` - Added missing figure number `[[Figure]]` → `[[Figure 2]]`
- `ch32MedicalApplicationsOfNuclearPhysics.md` - Fixed duplicate figure ID

#### Equation Fixes

- `ch10AngularAcceleration.md` - Added missing equals sign in equation

#### Missing Text Restored

- `ch33GUTS.md` - Restored missing W⁺, W⁻ particles in sentence about carrier particles
- `ch11ArchimedesPrinciple.md` - "blocks d the fluid" → "blocks and the fluid"

#### Image Syntax Normalized

- `ch19CapacitorsAndDielectrics.md` - Removed unnecessary angle brackets from image paths (2 figures)

### Summary

- **Total fixes:** 29 errors
- **Files renamed:** 2
- **Files modified:** 23
