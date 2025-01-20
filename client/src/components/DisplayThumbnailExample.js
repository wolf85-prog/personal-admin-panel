import React from 'react'
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail'

import '@react-pdf-viewer/core/lib/styles/index.css'

import { PageThumbnailPlugin } from 'src/components/PageThumbnailPlugin'

export const DisplayThumbnailExample = ({ fileUrl, pageIndex }) => {
  const thumbnailPluginInstance = thumbnailPlugin()
  const { Cover } = thumbnailPluginInstance
  const pageThumbnailPluginInstance = PageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => pageIndex} />,
  })

  return (
    <Viewer
      defaultScale={SpecialZoomLevel.PageFit}
      theme={{
        theme: 'dark',
      }}
      fileUrl={fileUrl}
      plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
    />
  )
}
