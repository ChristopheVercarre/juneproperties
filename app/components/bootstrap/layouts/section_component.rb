# frozen_string_literal: true

module Bootstrap
  module Layouts
    class SectionComponent < ApplicationComponent
      attr_reader :content

      validates :content, presence: true

      def initialize(id: 'section', data: {}, options: {})
        @id = id
        @content = content
        @options = options
        @data = data
        add_classes
        add_data_attributes
      end
    end
  end
end
