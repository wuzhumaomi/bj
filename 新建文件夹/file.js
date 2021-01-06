import http, { factory } from '../http'

export default {
  //获取附件组ID
  getFolderId: factory.createGet('fileSystem/getFolderId'),
  //获取所有附件
  getFileList: factory.postForm('fileSystem/getFileList'),
  //删除附件
  deleteFile: factory.postForm('fileSystem/deleteFile'),
  //上传附件
  uploadFile: (file, folderId,type) => {
    let formData = new FormData()
    formData.append('fileName', file.name)
    formData.append('folderId', folderId)
    formData.append('file', file)
    formData.append('type', type)
    return http.post('fileSystem/uploadFileBinary', formData).then(res => {
      if (res.status === 200) {
        return res.data
      }
      throw new Error('上传失败！')
    })
  },
  //下载附件
  downloadFile: file =>
    http
      .get(`fileSystem/downloadFileBinary?fileId=${file.id}`, {
        responseType: 'blob',
      })
      .then(res => {
        if (!res.data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([res.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', file.fileName)
        document.body.appendChild(link)
        link.click()
      })
}
