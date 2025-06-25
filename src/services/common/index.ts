import apiInstance from '../interceptor';

const apiEndPoints = {
  imageUpload: 'uploadMultipleFile'
};
export const commonApi = {
  async uploadFileAction(data: { files: any; moduleName: string }): Promise<[{ name: string }]> {
    const formData = new FormData();
    const fileArray = Array.isArray(data?.files) ? data?.files : [data?.files];
    fileArray?.map((value) => {
      formData.append('files', value);
    });
    formData.append('moduleName', data?.moduleName);
    return apiInstance
      .post(apiEndPoints.imageUpload, formData)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};
