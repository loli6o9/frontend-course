import '@/assets/scss/main.scss';
import { log }    from '@/lib/classes/utility';
import { Banner } from '@/components/banner';

async function init() {
    try {
        const { items } = await Banner.getItems();
        const insertElem = document.getElementById( 'insert-banner' );

        for ( const item of items ) {
            insertElem.append( new Banner( item ) );
        }

        log( 'app is init' );
    } catch ( e ) {
        log( e.message );
    }
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', init );
} else {
    init();
}