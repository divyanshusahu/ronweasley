import { Upload, Icon } from "antd";

function UploadImage(props) {
  const [uploadImageList, setUploadImageList] = React.useState([]);

  const upload_element_props = {
    accept: "image/*",
    beforeUpload: file => {
      setUploadImageList([...uploadImageList, file]);
      return false;
    },
    listType: "picture-card",
    multiple: true,
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
          <Icon type="plus" />
        </div>
      </Upload>
    </div>
  );
}

export default UploadImage;
