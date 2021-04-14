import { GlobSync } from 'glob';
import { unlinkSync } from 'fs';

// As a special build step before now.sh uploads our build (via yarn now:build),
// we remove all the sourcemaps right after we buid to make sure they don't get exposed publicly.
const sourceMapsGlob = new GlobSync('.next/**/*.map', { dot: true });
const originalAmountOfFiles = sourceMapsGlob.found.length;
console.log(`Found ${originalAmountOfFiles} sourcemap files in the build`);
sourceMapsGlob.found.forEach((sourceMapPath) => {
  console.log(`Deleting ${sourceMapPath}`);
  unlinkSync(sourceMapPath);
});
const sourceMapsAfterDeletingGlob = new GlobSync('.next/**/*.map', {
  dot: true,
});
const remainingAmountOfFilesAfterDeleting =
  sourceMapsAfterDeletingGlob.found.length;
if (remainingAmountOfFilesAfterDeleting !== 0) {
  throw new Error('Not all sourcemaps deleted');
}
console.log(
  `Successfully deleted ${
    originalAmountOfFiles - remainingAmountOfFilesAfterDeleting
  } sourcemaps (out of ${originalAmountOfFiles}) from the build`,
);
