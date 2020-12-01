import { $axios } from '@/plugins/axios';

export class Banner {
    constructor( props ) {
        const div = document.createElement( 'div' );

        div.className = 'banner-card';
        div.innerHTML = `
            <img src="${ props.previewImage }" 
                 class="banner-card__img">
            <div class="banner-card__title">${ props.title }</div>
        `;

        return div;
    }

    static getItems() {
        return $axios
            .post( '/api/catalog/elements/', {
                page: 1,
                limit: 25,
                sort: { title: 'asc' },
                filter: {
                    infoBlockCode: 'banners',
                    sectionId: null,
                },
                params: {
                    includeSubsections: true,
                },
            } )
            .then( response => response.data );
    }
}