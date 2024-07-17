document.addEventListener('DOMContentLoaded', function() {
    // Find all elements that require a file upload instance
    const uploadElements = document.querySelectorAll('[file-handler-instance]');
  
    // Iterate through each element and create an upload instance
    uploadElements.forEach(el => {
      createFileUploadInstance(el);
    });
  
    /**
     * Function to create a file upload instance.
     * @param {HTMLElement} container - The container element for the file upload instance.
     */
    function createFileUploadInstance(container) {
      const shouldIncludeUpload = container.getAttribute('file-handler-upload') === 'true';
      
      container.innerHTML = `
        ${shouldIncludeUpload ? '<input type="file" class="fileInput" multiple style="display:none;"><button class="custom-upload-button">Upload Additional Files</button>' : ''}
        <table class="fileTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody class="fileList"></tbody>
        </table>
      `;
  
      const style = document.createElement('style');
      style.textContent = `
        .file-handler {
          border: 2px solid #007bff;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          background-color: #f9f9f9;
          font-family: "Roboto Mono", monospace, monospace;
        }
        .fileTable {
          width: auto;
          border-collapse: separate;
          table-layout: auto;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .fileTable th, .fileTable td {
          border-bottom: 2px solid #f8f9fa;
          padding: 6px;
          text-align: left;
        }
        .fileTable th {
          background-color: #007bff;
          color: #ffffff;
          font-weight: 500;
          border-radius: 3px;
        }
        .fileTable tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .fileTable tr:hover {
          background-color: #ddd;
        }
        .file-info td {
          text-align: left;
        }
        .delete-button {
          color: #dc3545;
          cursor: pointer;
          font-weight: 500;
        }
        .delete-button:hover {
          color: #c0392b;
        }
        .custom-upload-button {
          display: inline-block;
          padding: 10px 20px;
          margin-bottom: 10px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .custom-upload-button:hover {
          background-color: #0056b3;
        }
      `;
      document.head.appendChild(style);
  
      if (shouldIncludeUpload) {
        const fileInput = container.querySelector('.fileInput');
        const uploadButton = container.querySelector('.custom-upload-button');
        const fileListDisplay = container.querySelector('.fileList');
        let storedFiles = [];
  
        uploadButton.addEventListener('click', function() {
          fileInput.click();
        });
  
        fileInput.addEventListener('change', function(event) {
          const fileList = event.target.files;
  
          Array.from(fileList).forEach(file => {
            const fileObject = {
              file: file,
              url: URL.createObjectURL(file)
            };
            storedFiles.push(fileObject);
            displayFile(fileObject);
          });
  
          event.target.value = ''; // Reset the file input
        });
  
        /**
         * Function to display a file in the file list.
         * @param {Object} fileObject - The file object containing the file and its URL.
         */
        function displayFile(fileObject) {
          const listItem = document.createElement('tr');
          listItem.classList.add('file-info');
  
          const nameCell = document.createElement('td');
          const downloadLink = document.createElement('a');
          downloadLink.href = fileObject.url;
          downloadLink.download = fileObject.file.name;
          downloadLink.textContent = fileObject.file.name;
          nameCell.appendChild(downloadLink);
  
          const sizeCell = document.createElement('td');
          sizeCell.textContent = `${(fileObject.file.size / 1024).toFixed(2)} KB`;
  
          const deleteCell = document.createElement('td');
          const deleteButton = document.createElement('span');
          deleteButton.textContent = 'Delete';
          deleteButton.classList.add('delete-button');
          deleteButton.addEventListener('click', function() {
            storedFiles = storedFiles.filter(f => f !== fileObject);
            URL.revokeObjectURL(fileObject.url); // Revoke the object URL
            fileListDisplay.removeChild(listItem);
          });
          deleteCell.appendChild(deleteButton);
  
          listItem.appendChild(nameCell);
          listItem.appendChild(sizeCell);
          listItem.appendChild(deleteCell);
          fileListDisplay.appendChild(listItem);
        }
  
        /**
         * Method to add generated files to the file list.
         * @param {Object} fileObject - The file object to add.
         */
        container.addFile = function(fileObject) {
          storedFiles.push(fileObject);
          displayFile(fileObject);
        };
  
        // Load previously stored files (if any)
        window.addEventListener('load', function() {
          storedFiles.forEach(fileObject => displayFile(fileObject));
        });
      }
    }
  });
  