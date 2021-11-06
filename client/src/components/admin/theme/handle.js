import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import Warnning from './warnning'
import { useDetectOutsideClick } from '../../../middleWare/detectOutsideClick'
import Loader from '../../common/loader'

const RenderUi = React.lazy(() => import('./renderUi'))

export const Theme = (props) => {
    const { visiable: warn, setvisiable: set_warn, ref: ref_warn } = useDetectOutsideClick(false)

    return (
        <>
            <React.Suspense fallback={<Loader />}>

                <RenderUi
                    set_warn={set_warn}
                />
                <Warnning
                    trigger={warn}
                    setTrigger={set_warn}
                    abcd={ref_warn}
                />
            </React.Suspense>

        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Theme)
