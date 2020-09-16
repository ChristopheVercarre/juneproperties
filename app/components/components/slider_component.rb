# frozen_string_literal: true

module Components
  class SliderComponent < ApplicationComponent
    with_content_areas :slides

    def initialize(id: 'slider', data: {}, options: {})
      @id = id
      @data = data
      @options = options
      add_data_attributes
      add_classes
    end

    def add_data_attributes
      @data[:controller] = 'slider'
      super
    end
  end
end
