class Signature
  include Mongoid::Document
  field :name, type: String
  field :output, type: Array
  field :signatureid, type: String
end
