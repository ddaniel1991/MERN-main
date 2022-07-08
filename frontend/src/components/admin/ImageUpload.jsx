import React from 'react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { DragDrop, Dashboard, ProgressBar } from '@uppy/react';
import  AwsS3  from '@uppy/aws-s3';
import ms from 'ms'
import { toast } from 'react-toastify';

import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
const companion_url = 'http://localhost:4000/companion'


const ImageUpload = (props) => {
    const uppy = new Uppy({
        meta: { type: 'image' },
        restrictions: { maxNumberOfFiles: 1 },
        autoProceed: true,
        height: 250,
        width: 400,
    });
    uppy
    
    .use(AwsS3, {
        companionUrl: companion_url,
        limit: 1,
        timeout: ms('1 minute'),
        metaFields: ['name', 'itemId']
      })
    
    // .use(ProgressBar, {
    //     target: '.drag-drop-container',
    //     fixed: true,
    //     hideAfterFinish: false,
    //     id: 'progressBar1'
    // })
    .on('complete', (result) => {
        if(result.successful.length > 0) {
            toast.success('Image Upload Successful')
            let url = result.successful[0].uploadURL
            props.updateImageUrl(url)
        }
        if(result.failed.length > 0) {
            toast.error("Image Upload Failed")
        }
    });
    


	return (
     
		<div className='drag-drop-container container'>
			<DragDrop
				uppy={uppy}
				locale={{
					strings: {
						// Text to show on the droppable area.
						// `%{browse}` is replaced with a link that opens the system file selection dialog.
						dropHereOr: 'Drop here or %{browse}',
						// Used as the label for the link that opens the system file selection dialog.
						browse: 'browse'
					}
				}}
			/>
		</div>
	);
};

export default ImageUpload;