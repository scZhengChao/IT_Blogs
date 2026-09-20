# 文件操作

## 目录

- [导入本地excel  ](#导入本地excel-)
- [下载文件fs.downloadFile](#下载文件fsdownloadFile)
- [打开文件FileOpener](#打开文件FileOpener)
- [生成图片并保存到相册](#生成图片并保存到相册)

# 导入本地excel &#x20;

ios 不支持直接打开文件夹

```javascript 
 batchExcelImport = async ()=>{
    this.cancelBatchImportModalVisible()
    if (Platform.OS === 'ios') {
      const list = await getIosExcelList()
      this.props.pushTo({
        page: 'ExcelFileListPage',
        params: {
          excelList: list || [],
          selectCallBack: (filePath: string) => {
            this.importExcel(filePath)
          },
        },
      })
    } else if (Platform.OS === 'android') {
      const result = await getAndroidExcelPath()
      this.importExcel(result.excelPath)
    }
  }
  importExcel = (excelPath: string) => {
    const { importExcelCustomer=_.noop } = this.props
    if (!_.isEmpty(excelPath)) {
      if ((excelPath.includes('xlsx')) || (excelPath.includes('xls'))) {
        let newExcelPath = excelPath
        if (Platform.OS === 'android') {
          if (!excelPath.includes('file://')) {
            newExcelPath = `file://${excelPath}`
          }
        }
        importExcelCustomer({ excelPath: newExcelPath })
      } else {
        Toast.showShortCenter('只支持excel批量导入')
      }
    }
  }
```


# 下载文件fs.downloadFile

```javascript 
 downloadFile =async ()=>{
    this.cancelBatchImportModalVisible()
      const { selectedTask } = this.state
      const { file_path = '', create_time = '' } = selectedTask

      const updateDownloadStatus = (downloadingText: string = '') => {
        this.setState({ downloadingText })
      }

      let rootPath = `${fs.DocumentDirectoryPath}/_download/xls`
      if (Platform.OS === 'android') {
        rootPath = `${fs.ExternalDirectoryPath}/_download/xls`
      }

      if (!(await fs.exists(rootPath))) {
        await fs.mkdir(rootPath)
      }
      const fileType = file_path.substring(file_path.lastIndexOf('.'), file_path.length) // like .xlsx
      const toFile = `${rootPath}/对账记录${create_time || ''}${fileType}`

      if (await this.openFile(toFile)) {
        return
      }

      updateDownloadStatus('  :下载中,请稍后...')
      const progress = (res: { jobId: number, contentLength: number, bytesWritten: number }) => {
        updateDownloadStatus(`  :当前下载进度:${res.bytesWritten / res.contentLength}`)
      }

      const downloadResult = fs.downloadFile({
        fromUrl: encodeURI(file_path),
        toFile,
        progress,
        progressInterval: 100,
        progressDivider: 100,
      })

      downloadResult.promise
        .then(() => {
          updateDownloadStatus('')
          this.openFile(toFile)
        })
        .catch(e => {
          updateDownloadStatus(`  :${e.message}`)
        })
}
```


# 打开文件FileOpener

[react-native-file-opener](https://github.com/huangzuizui/react-native-file-opener "react-native-file-opener")

打开文件

```javascript 
文件后缀名    对于mime type
'apk'        'application/vnd.android.package-archive',
'3gp'        'video/3gpp', 
'ai'        'application/postscript', 
'aif'        'audio/x-aiff', 
'aifc'        'audio/x-aiff', 
'aiff'        'audio/x-aiff', 
'asc'        'text/plain', 
'atom'        'application/atom+xml', 
'au'        'audio/basic', 
'avi'        'video/x-msvideo', 
'bcpio'        'application/x-bcpio', 
'bin'        'application/octet-stream', 
'bmp'        'image/bmp', 
'cdf'        'application/x-netcdf', 
'cgm'        'image/cgm', 
'class'        'application/octet-stream', 
'cpio'        'application/x-cpio', 
'cpt'        'application/mac-compactpro', 
'csh'        'application/x-csh', 
'css'        'text/css', 
'dcr'        'application/x-director', 
'dif'        'video/x-dv', 
'dir'        'application/x-director', 
'djv'        'image/vnd.djvu', 
'djvu'        'image/vnd.djvu', 
'dll'        'application/octet-stream', 
'dmg'        'application/octet-stream', 
'dms'        'application/octet-stream', 
'doc'        'application/msword', 
'dtd'        'application/xml-dtd', 
'dv'        'video/x-dv', 
'dvi'        'application/x-dvi', 
'dxr'        'application/x-director', 
'eps'        'application/postscript', 
'etx'        'text/x-setext', 
'exe'        'application/octet-stream', 
'ez'        'application/andrew-inset', 
'flv'        'video/x-flv', 
'gif'        'image/gif', 
'gram'        'application/srgs', 
'grxml'        'application/srgs+xml', 
'gtar'        'application/x-gtar', 
'gz'        'application/x-gzip', 
'hdf'        'application/x-hdf', 
'hqx'        'application/mac-binhex40', 
'htm'        'text/html', 
'html'        'text/html', 
'ice'        'x-conference/x-cooltalk', 
'ico'        'image/x-icon', 
'ics'        'text/calendar', 
'ief'        'image/ief', 
'ifb'        'text/calendar', 
'iges'        'model/iges', 
'igs'        'model/iges', 
'jnlp'        'application/x-java-jnlp-file', 
'jp2'        'image/jp2', 
'jpe'        'image/jpeg', 
'jpeg'        'image/jpeg', 
'jpg'        'image/jpeg', 
'js'        'application/x-javascript', 
'kar'        'audio/midi', 
'latex'        'application/x-latex', 
'lha'        'application/octet-stream', 
'lzh'        'application/octet-stream', 
'm3u'        'audio/x-mpegurl', 
'm4a'        'audio/mp4a-latm', 
'm4p'        'audio/mp4a-latm', 
'm4u'        'video/vnd.mpegurl', 
'm4v'        'video/x-m4v', 
'mac'        'image/x-macpaint', 
'man'        'application/x-troff-man', 
'mathml'        'application/mathml+xml', 
'me'        'application/x-troff-me', 
'mesh'        'model/mesh', 
'mid'        'audio/midi', 
'midi'        'audio/midi', 
'mif'        'application/vnd.mif', 
'mov'        'video/quicktime', 
'movie'        'video/x-sgi-movie', 
'mp2'        'audio/mpeg', 
'mp3'        'audio/mpeg', 
'mp4'        'video/mp4', 
'mpe'        'video/mpeg', 
'mpeg'        'video/mpeg', 
'mpg'        'video/mpeg', 
'mpga'        'audio/mpeg', 
'ms'        'application/x-troff-ms', 
'msh'        'model/mesh', 
'mxu'        'video/vnd.mpegurl', 
'nc'        'application/x-netcdf', 
'oda'        'application/oda', 
'ogg'        'application/ogg', 
'ogv'        'video/ogv', 
'pbm'        'image/x-portable-bitmap', 
'pct'        'image/pict', 
'pdb'        'chemical/x-pdb', 
'pdf'        'application/pdf', 
'pgm'        'image/x-portable-graymap', 
'pgn'        'application/x-chess-pgn', 
'pic'        'image/pict', 
'pict'        'image/pict', 
'png'        'image/png', 
'pnm'        'image/x-portable-anymap', 
'pnt'        'image/x-macpaint', 
'pntg'        'image/x-macpaint', 
'ppm'        'image/x-portable-pixmap', 
'ppt'        'application/vnd.ms-powerpoint', 
'ps'        'application/postscript', 
'qt'        'video/quicktime', 
'qti'        'image/x-quicktime', 
'qtif'        'image/x-quicktime', 
'ra'        'audio/x-pn-realaudio', 
'ram'        'audio/x-pn-realaudio', 
'ras'        'image/x-cmu-raster', 
'rdf'        'application/rdf+xml', 
'rgb'        'image/x-rgb', 
'rm'        'application/vnd.rn-realmedia', 

```


```javascript 
'roff'        'application/x-troff', 
'rtf'        'text/rtf', 
'rtx'        'text/richtext', 
'sgm'        'text/sgml', 
'sgml'        'text/sgml', 
'sh'        'application/x-sh', 
'shar'        'application/x-shar', 
'silo'        'model/mesh', 
'sit'        'application/x-stuffit', 
'skd'        'application/x-koan', 
'skm'        'application/x-koan', 
'skp'        'application/x-koan', 
'skt'        'application/x-koan', 
'smi'        'application/smil', 
'smil'        'application/smil', 
'snd'        'audio/basic', 
'so'        'application/octet-stream', 
'spl'        'application/x-futuresplash', 
'src'        'application/x-wais-source', 
'sv4cpio'        'application/x-sv4cpio', 
'sv4crc'        'application/x-sv4crc', 
'svg'        'image/svg+xml', 
'swf'        'application/x-shockwave-flash', 
't'        'application/x-troff', 
'tar'        'application/x-tar', 
'tcl'        'application/x-tcl', 
'tex'        'application/x-tex', 
'texi'        'application/x-texinfo', 
'texinfo'        'application/x-texinfo', 
'tif'        'image/tiff', 
'tiff'        'image/tiff', 
'tr'        'application/x-troff', 
'tsv'        'text/tab-separated-values', 
'txt'        'text/plain', 
'ustar'        'application/x-ustar', 
'vcd'        'application/x-cdlink', 
'vrml'        'model/vrml', 
'vxml'        'application/voicexml+xml', 
'wav'        'audio/x-wav', 
'wbmp'        'image/vnd.wap.wbmp', 
'wbxml'        'application/vnd.wap.wbxml', 
'webm'        'video/webm', 
'wml'        'text/vnd.wap.wml', 
'wmlc'        'application/vnd.wap.wmlc', 
'wmls'        'text/vnd.wap.wmlscript', 
'wmlsc'        'application/vnd.wap.wmlscriptc', 
'wmv'        'video/x-ms-wmv', 
'wrl'        'model/vrml', 
'xbm'        'image/x-xbitmap', 
'xht'        'application/xhtml+xml', 
'xhtml'        'application/xhtml+xml', 
'xls'        'application/vnd.ms-excel', 
'xml'        'application/xml', 
'xpm'        'image/x-xpixmap', 
'xsl'        'application/xml', 
'xslt'        'application/xslt+xml', 
'xul'        'application/vnd.mozilla.xul+xml', 
'xwd'        'image/x-xwindowdump', 
'xyz'        'chemical/x-xyz', 
'zip'        'application/zip'
```


[GitHub - huangzuizui/react-native-file-opener: A React Native module that allows you to open a file (mp3, mp4, pdf, word, excel, dwg etc.) on your device with its default application A React Native module that allows you to open a file (mp3, mp4, pdf, word, excel, dwg etc.) on your device with its default application - GitHub - huangzuizui/react-native-file-opener: A React Nati... https://github.com/huangzuizui/react-native-file-opener](https://github.com/huangzuizui/react-native-file-opener "GitHub - huangzuizui/react-native-file-opener: A React Native module that allows you to open a file (mp3, mp4, pdf, word, excel, dwg etc.) on your device with its default application A React Native module that allows you to open a file (mp3, mp4, pdf, word, excel, dwg etc.) on your device with its default application - GitHub - huangzuizui/react-native-file-opener: A React Nati... https://github.com/huangzuizui/react-native-file-opener")

```javascript 
 import FileOpener from 'react-native-file-opener'
const openFile = async (targetPath, type?: string = 'application/octet-stream') => {
    if (await fs.exists(targetPath)) {
        // FileOpener
        FileOpener.open(targetPath, type).catch(e => {
            Toast.showShortCenter(e.message)
        })
        return true
    }
    return false
}
```


# 生成图片并保存到相册

[  https://github.com/rescript-react-native/cameraroll](https://github.com/rescript-react-native/cameraroll "  https://github.com/rescript-react-native/cameraroll")

[GitHub - gre/react-native-view-shot: Snapshot a React Native view and save it to an image Snapshot a React Native view and save it to an image - GitHub - gre/react-native-view-shot: Snapshot a React Native view and save it to an image https://github.com/gre/react-native-view-shot](https://github.com/gre/react-native-view-shot "GitHub - gre/react-native-view-shot: Snapshot a React Native view and save it to an image Snapshot a React Native view and save it to an image - GitHub - gre/react-native-view-shot: Snapshot a React Native view and save it to an image https://github.com/gre/react-native-view-shot")

```javascript 

import {captureRef} from "react-native-view-shot";
import CameraRoll from '@react-native-community/cameraroll'
public savePic = ()=>{
        this.captureQRCodeImage()
            .then((uri) => {
                CameraRoll.save(uri)
                    .then(() => {
                        Toast.showShortCenter('图片已保存到相册')
                    })
                    .catch(() => {
                        Toast.showShortCenter('图片保存失败')
                    })
            })
            .catch(() => {
                Toast.showShortCenter('图片保存失败')
            })
    }
    public captureQRCodeImage = () => new Promise((resolve, reject) => {
        captureRef(this.qrCodeImageRef, {
            format: 'jpg',
            quality: 0.8,
            result: 'tmpfile',
        })
            .then((uri) => {
                resolve(uri)
            }, () => {
                reject('生成图片失败，请稍后再试')
            })
            .catch(() => {
                reject('生成图片失败，请稍后再试')
            })
    })


<View
                style={styles.qrView}
                ref={ref => {
                    this.qrCodeImageRef = ref
                }}
            >
                <View style={styles.qrHeader}>
                    <Image
                        source={require('../images/icon55.png')}
                        style={styles.imgTitle}
                    />
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.headerText}>通写变绿地爱你 </Text>
                        <Text style={[styles.headerText,{marginLeft:13}]}>2512512512</Text>
                    </View>

                </View>

                <View style={styles.qrContent}>
                    <QRCode
                        value={'asgasgasf'}
                        size={200}
                        color="#000000"
                        backgroundColor="#f2f2f2"
                        logoSize={50}
                        logoMargin={4}
                        logoBackgroundColor="transparent"
                        logo={require('../images/logo.png')}
                    />
                    <Text style={styles.contentText}>微信扫一扫 快速打开身份码</Text>

                    <TouchableOpacity onPress={this.savePic}>
                        <Text style={styles.saveBtn}>保存图片至手机</Text>
                    </TouchableOpacity>
                </View>

          

// 或者
public onSaveShelvesImgPress = async () => {
    try {
      const shelvesImg = await captureRef(this.refs.shelvesImg, {
        format: 'jpg',
        quality: 0.5,
      })
      await CameraRoll.save(shelvesImg)
      Toast.showShortCenter('保存成功')
    } catch (error) {
      Toast.showShortCenter('保存失败')
    }
}
```
