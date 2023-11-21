import React from 'react'
import { Travel } from '../../../core/services/interfaces/travel'
import { Carousel } from './../../../shared/components/Carousel';
import { CoinIcon, GeoAltFillIcon } from '../../../shared/components/Icon';

export const TravelDetail = (props) => {
  const travelItem: Travel = props.travel;

  return (
    <div className='container-fluid g-0'>
      <div className="row">
        <div className="col-12 py-2">
          <Carousel images={travelItem.images} imagesHeight={400}></Carousel>
        </div>
        <div className="col-12 py-2">
          <p>{travelItem.description}</p>
          <p><span className='fw-bold'><GeoAltFillIcon></GeoAltFillIcon> Ciudad de origen: </span>{travelItem.originCity}</p>
          <p><span className='fw-bold'><GeoAltFillIcon></GeoAltFillIcon> Ciudad de destino: </span>{travelItem.destinationCity}</p>
          <p><span className='fw-bold'><CoinIcon></CoinIcon> Precio: </span>{travelItem.price}</p>
        </div>
      </div>
    </div>
  )
}
