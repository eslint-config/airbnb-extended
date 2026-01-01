import createDirectories from '@/lib/createDirectories';
import writeFiles from '@/lib/writeFiles';

const run = async () => {
  await createDirectories();
  await writeFiles();
};

try {
  await run();
  console.log('Done');
} catch (error) {
  console.error(error);
}
