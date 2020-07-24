import React, { useEffect } from 'react'

import './masonry-layout.component.scss'

export default function MasonryLayout (props) {
    const { noteList } = props

    const resizeMasonryItem = (item) =>{
        const grid = document.getElementsByClassName('masonry-layout')[0]
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))
        const actionButtonsHeight = item.querySelector('.action-wrapper').getBoundingClientRect().height + rowGap
        const rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height + actionButtonsHeight + rowGap*2)/(rowHeight+rowGap));
        item.style.gridRowEnd = 'span '+rowSpan;
    }
    
    const resizeAllMasonryItems = () => {
      var allItems = document.getElementsByClassName('masonry-brick');
      for(let itemIndex=0; itemIndex<allItems.length; itemIndex++){
        resizeMasonryItem(allItems[itemIndex]);
      }
    }

    useEffect(()=> {
        resizeAllMasonryItems()
    }, [noteList])

    return (
        <div className='masonry-layout'>
            {props.children}
        </div>
    )
}