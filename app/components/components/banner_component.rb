# frozen_string_literal: true

module Components
  class BannerComponent < ApplicationComponent
    attr_reader :background, :content, :options

    validates :background, presence: true

    with_content_areas :background

    def initialize(id: 'banner', data: {}, background: nil, options: {})
      @id = id
      @background = background
      @data = data
      @options = options
      add_data_attributes
      add_classes
    end
  end
end
