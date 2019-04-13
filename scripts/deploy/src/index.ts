import consola from 'consola';
import {
  buildFileContextsTogether,
  deployAssets,
  deleteOldObjects,
  buildApp,
  deployApp,
  purgeCDN,
} from './processors';
import { DeployConfig } from 'src/types';

export const deploy = async (config: DeployConfig) => {
  const { assetsDirs, s3Bucket, cloudFrontId, buildCommands } = config;

  try {
    await buildApp(buildCommands);

    const fileContexts = await buildFileContextsTogether(assetsDirs);

    await deployAssets({ fileContexts, s3Bucket, deployConifg: config });
    await deployApp();

    await deleteOldObjects({
      s3Bucket,
    });
    await purgeCDN({ cloudFrontId });
    consola.success('Deploy completed');
  } catch (err) {
    consola.error(err);
    process.exit(1);
  }
};
