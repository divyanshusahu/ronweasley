import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function UploadImage(props) {
  const [uploadImageList, setUploadImageList] = React.useState([]);

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState(null);

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handlePreviewCancel = () => {
    setPreviewVisible(false);
  };

  const upload_element_props = {
    accept: "image/*",
    beforeUpload: file => {
      setUploadImageList([...uploadImageList, file]);
      return false;
    },
    listType: "picture-card",
    multiple: false,
    onPreview: async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      let img = file.url || file.preview;
      setPreviewImage(img);
      setPreviewVisible(true);
    },
    onRemove: file => {
      let index = uploadImageList.indexOf(file);
      let newUploadImageList = uploadImageList.slice();
      newUploadImageList.splice(index, 1);
      setUploadImageList(newUploadImageList);
    }
  };

  if (true) {
    props.handleImageList(uploadImageList);
  }

  return (
    <div>
      <Upload {...upload_element_props}>
        <div>
          <PlusOutlined />
        </div>
      </Upload>
      <Modal
        centered={true}
        closable={false}
        visible={previewVisible}
        footer={null}
        onCancel={handlePreviewCancel}
        width={768}
      >
        <img alt="image" src={previewImage} style={{ maxWidth: "100%" }} />
      </Modal>
    </div>
  );
}

export default UploadImage;
