var utils = require('phonegap/utils'),
    Entry = require('phonegap/plugin/Entry'),
    FileWriter = require('phonegap/plugin/FileWriter'),
    FileError = require('phonegap/plugin/FileError');

/**
 * An interface representing a file on the file system.
 * 
 * {boolean} isFile always true (readonly)
 * {boolean} isDirectory always false (readonly)
 * {DOMString} name of the file, excluding the path leading to it (readonly)
 * {DOMString} fullPath the absolute full path to the file (readonly)
 * {FileSystem} filesystem on which the file resides (readonly)
 */
var FileEntry = function(name, fullPath) {
     FileEntry.__super__.constructor.apply(this, [true, false, name, fullPath]);
};

utils.extend(FileEntry, Entry);

/**
 * Creates a new FileWriter associated with the file that this FileEntry represents.
 *
 * @param {Function} successCallback is called with the new FileWriter
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.createWriter = function(successCallback, errorCallback) {
    this.file(function(filePointer) {
        var writer = new FileWriter(filePointer);

        if (writer.fileName === null || writer.fileName === "") {
            if (typeof errorCallback === "function") {
                errorCallback(new FileError(FileError.INVALID_STATE_ERR));
            }
        } else {
            if (typeof successCallback === "function") {
                successCallback(writer);
            }
        }
    }, errorCallback);
};

/**
 * Returns a File that represents the current state of the file that this FileEntry represents.
 *
 * @param {Function} successCallback is called with the new File object
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.file = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "File", "getFileMetadata", [this.fullPath]);
};


module.exports = FileEntry;