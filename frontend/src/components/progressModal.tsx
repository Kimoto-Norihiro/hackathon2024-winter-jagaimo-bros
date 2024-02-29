import { Modal } from 'antd';
import { useRouter } from 'next/router';

type Props = {
    open: boolean;
    setOpenProgressModal: (value: boolean) => void;
}

export const ProgressModal = (props: Props) => {
    const { open, setOpenProgressModal } = props;

    const router = useRouter();
    const onCancel = () => {
        setOpenProgressModal(false);
        router.push('/top');
    }

    const { query } = useRouter();
    const { id } = query;
    const onOk = () => {
        router.push(`${id}`);
    }

    return (
        <Modal
            title='業種は同じにしますか？'
            okText={'次の問題へ'}
            cancelText={'業種選択画面へ'}
            open={open}
            onCancel={onCancel}
            width={500}
            onOk={onOk}
        >

        </Modal>
    )
}
